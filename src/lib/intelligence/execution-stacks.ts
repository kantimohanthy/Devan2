/**
 * @file Engineering Execution Intelligence (UJ.OS v2.1)
 * @purpose End-to-end multi-domain execution stacks modeling execution flow, observability signals, failure reasoning, and career mappings.
 * @principle Answers "Walk me through what happens when..." with deep packet, socket, kernel, and system trace intelligence.
 */

export interface StackStep {
  stepNumber: number;
  title: string;
  conceptId: string;
  purpose: string;
  input: string;
  output: string;
  dependencies: string[];
  observableSignals: {
    metrics: string;
    logs: string;
    traces: string;
    packetCaptures?: string;
    kernelEvents?: string;
    systemCalls?: string;
  };
  failureModes: {
    symptom: string;
    impact: string;
    diagnosticTools: string[];
    recovery: string;
  };
  evidenceIds: string[];
  commands: string[];
  interviewQuestion: string;
  relatedRfcsOrManPages: string[];
}

export interface ExecutionStack {
  stackId: string;
  title: string;
  purpose: string;
  conceptIds: string[];
  steps: StackStep[];
  overallFailurePoints: string[];
  observabilityTools: string[];
  careerRelevance: string[];
}

export const CANONICAL_EXECUTION_STACKS: ExecutionStack[] = [
  // 1. HTTP Request Lifecycle
  {
    stackId: "stack-http-lifecycle",
    title: "HTTP Request Lifecycle (Browser to Database)",
    purpose: "Traces complete end-to-end execution path when a user submits an HTTP request.",
    conceptIds: ["networking.dns", "networking.tcp", "networking.tls", "networking.socket-api", "linux.kernel", "networking.ethernet", "networking.routing", "networking.http"],
    overallFailurePoints: ["DNS timeout", "TCP SYN dropped", "TLS certificate expired", "502 Bad Gateway", "Database connection pool exhausted"],
    observabilityTools: ["dig", "Wireshark", "tshark", "strace", "bpftrace", "curl"],
    careerRelevance: ["Network Engineer", "Platform Engineer", "SRE", "Infrastructure Engineer", "Web Engineer"],
    steps: [
      {
        stepNumber: 1,
        title: "DNS Name Resolution",
        conceptId: "networking.dns",
        purpose: "Resolve target domain hostname to IPv4/IPv6 address.",
        input: "Hostname string (e.g. example.com)",
        output: "32-bit IPv4 address (e.g. 93.184.216.34)",
        dependencies: ["networking.udp", "networking.ipv4"],
        observableSignals: {
          metrics: "dns_query_duration_ms, dns_lookup_failures_total",
          logs: "CoreDNS log: [INFO] 127.0.0.1:53 - A example.com.",
          traces: "OpenTelemetry span: dns.lookup",
          packetCaptures: "tshark -i eth0 -f 'port 53' (UDP/53 query datagram)",
          systemCalls: "getaddrinfo()",
        },
        failureModes: {
          symptom: "EAI_AGAIN / SERVFAIL response",
          impact: "Application fails to resolve IP and aborts connection setup.",
          diagnosticTools: ["dig +trace example.com", "nslookup"],
          recovery: "Flush local DNS cache or switch recursive resolver to 1.1.1.1.",
        },
        evidenceIds: ["ev-pcap-dns-trace"],
        commands: ["dig +trace example.com", "systemd-resolve --flush-caches"],
        interviewQuestion: "Walk through what happens during iterative DNS resolution when resolving a new domain.",
        relatedRfcsOrManPages: ["RFC 1035", "man 3 getaddrinfo"],
      },
      {
        stepNumber: 2,
        title: "TCP 3-Way Handshake Connection Establishment",
        conceptId: "networking.tcp",
        purpose: "Establish stateful, reliable L4 byte-stream socket over TCP port 443.",
        input: "Target IP address + Port 443",
        output: "ESTABLISHED TCP TCB socket state",
        dependencies: ["networking.ipv4", "networking.socket-api"],
        observableSignals: {
          metrics: "tcp_active_opens_total, tcp_retrans_segs",
          logs: "Kernel dmesg / netstat: ESTABLISHED 192.168.1.50:54321 -> 93.184.216.34:443",
          traces: "OpenTelemetry span: tcp.connect",
          packetCaptures: "tshark -i eth0 'tcp.flags.syn==1'",
          systemCalls: "connect(fd, &sockaddr, sizeof(sockaddr))",
        },
        failureModes: {
          symptom: "ETIMEDOUT / ECONNREFUSED",
          impact: "Client socket fails to complete SYN/ACK handshake.",
          diagnosticTools: ["ss -tani", "tcpdump -i eth0 'tcp[tcpflags] & tcp-syn != 0'"],
          recovery: "Verify target server listening port and firewall security group rules.",
        },
        evidenceIds: ["ev-exp-protocol-trace"],
        commands: ["ss -tani", "curl -v https://example.com"],
        interviewQuestion: "Why does TCP require a 3-way handshake before transmitting data?",
        relatedRfcsOrManPages: ["RFC 793", "man 2 connect"],
      },
      {
        stepNumber: 3,
        title: "TLS 1.3 Encrypted Handshake",
        conceptId: "networking.tls",
        purpose: "Negotiate ECDHE symmetric encryption key and authenticate server X.509 certificate.",
        input: "Unencrypted TCP socket",
        output: "Encrypted TLS session context",
        dependencies: ["networking.tcp"],
        observableSignals: {
          metrics: "tls_handshake_duration_ms, tls_certificate_expiration_days",
          logs: "OpenSSL / Nginx log: TLSv1.3 / TLS_AES_256_GCM_SHA384",
          traces: "OpenTelemetry span: tls.handshake",
          packetCaptures: "tshark -i eth0 'ssl.handshake.type==1' (ClientHello)",
          systemCalls: "SSL_do_handshake()",
        },
        failureModes: {
          symptom: "SSL_ERROR_SYSCALL / CERT_HAS_EXPIRED",
          impact: "TLS handshake aborts due to untrusted or expired certificate.",
          diagnosticTools: ["openssl s_client -connect example.com:443 -showcerts"],
          recovery: "Renew ACME Let's Encrypt certificate via certbot.",
        },
        evidenceIds: ["ev-exp-protocol-trace"],
        commands: ["openssl s_client -connect example.com:443"],
        interviewQuestion: "How does TLS 1.3 achieve 1-RTT handshake latency compared to TLS 1.2?",
        relatedRfcsOrManPages: ["RFC 8446", "man 1 openssl-s_client"],
      },
    ],
  },

  // 2. Linux Process Lifecycle
  {
    stackId: "stack-linux-process-lifecycle",
    title: "Linux Process Lifecycle (execve to Exit)",
    purpose: "Traces process birth via execve(), memory mapping, scheduler vruntime tracking, and signal termination.",
    conceptIds: ["linux.elf-binary", "linux.syscalls", "linux.virtual-memory", "linux.paging", "linux.cfs-scheduler", "linux.signals", "os.process"],
    overallFailurePoints: ["SIGSEGV segmentation fault", "OOM killer termination", "Exec format error", "Zombie process accumulation"],
    observabilityTools: ["strace", "gdb", "perf", "bpftrace", "ps", "pstree"],
    careerRelevance: ["Systems Engineer", "Platform Engineer", "SRE", "Kernel Programmer"],
    steps: [
      {
        stepNumber: 1,
        title: "Kernel execve() System Call Execution",
        conceptId: "linux.syscalls",
        purpose: "Parse binary path, evaluate ELF header, and allocate new task_struct execution context.",
        input: "Binary file path string (e.g. /usr/bin/python3)",
        output: "New task_struct with blank virtual address space",
        dependencies: ["linux.user-space", "linux.kernel-space"],
        observableSignals: {
          metrics: "sys_enter_execve_total",
          logs: "auditd log: type=EXECVE msg=audit(1628400000.123): pid=1234 comm=\"python3\"",
          traces: "bpftrace tracepoint:syscalls:sys_enter_execve",
          systemCalls: "execve('/usr/bin/python3', ['python3', 'app.py'], envp)",
        },
        failureModes: {
          symptom: "ENOENT / ENOEXEC",
          impact: "Kernel rejects execution due to missing file or invalid binary format.",
          diagnosticTools: ["strace -e execve ./app", "file ./app"],
          recovery: "Fix missing interpreter shebang path or grant +x permissions.",
        },
        evidenceIds: ["ev-repo-devan2"],
        commands: ["strace -e execve /bin/ls", "file /bin/ls"],
        interviewQuestion: "What kernel state changes occur when execve() replaces a process image?",
        relatedRfcsOrManPages: ["man 2 execve", "man 5 elf"],
      },
      {
        stepNumber: 2,
        title: "Virtual Memory Paging & mmap() Segment Allocation",
        conceptId: "linux.virtual-memory",
        purpose: "Map ELF .text, .data, and .bss segments into virtual memory page tables.",
        input: "ELF binary program headers",
        output: "Virtual address space layout (Text, Data, Heap, Stack)",
        dependencies: ["linux.paging", "linux.vfs"],
        observableSignals: {
          metrics: "minor_page_faults_total, major_page_faults_total",
          logs: "Kernel panic / dmesg: Memory cgroup out of memory",
          traces: "perf stat -e page-faults",
          systemCalls: "mmap(NULL, length, PROT_READ|PROT_EXEC, MAP_PRIVATE, fd, offset)",
        },
        failureModes: {
          symptom: "SIGSEGV / ENOMEM",
          impact: "Process attempts illegal memory access or exceeds RAM limits.",
          diagnosticTools: ["gdb ./app core", "cat /proc/<pid>/maps"],
          recovery: "Fix buffer overflow or increase cgroups memory.max allocation.",
        },
        evidenceIds: ["ev-repo-devan2"],
        commands: ["cat /proc/self/maps", "pmap -x $$"],
        interviewQuestion: "Explain the difference between minor and major page faults in Linux.",
        relatedRfcsOrManPages: ["man 2 mmap", "man 7 proc"],
      },
    ],
  },

  // 3. Container Lifecycle
  {
    stackId: "stack-container-lifecycle",
    title: "Container Execution Stack (OCI Runtime to OverlayFS)",
    purpose: "Traces container startup from OCI spec down to Linux namespaces, cgroups v2, and OverlayFS layer mounts.",
    conceptIds: ["linux.namespaces", "linux.cgroups", "cloud.containerd", "linux.vfs", "networking.switching", "cloud.kubernetes"],
    overallFailurePoints: ["CrashLoopBackOff", "cgroup OOM KILLED", "Mount namespace failure", "veth bridge interface down"],
    observabilityTools: ["crictl", "docker", "cctop", "bpftrace", "ip netns"],
    careerRelevance: ["Containers SRE", "Platform Engineer", "Cloud Architect"],
    steps: [
      {
        stepNumber: 1,
        title: "Linux Namespace Creation & Resource Isolation",
        conceptId: "linux.namespaces",
        purpose: "Isolate PID, NET, MNT, IPC, UTS, and USER views for container processes.",
        input: "OCI runtime config.json spec",
        output: "Isolated Linux namespace IDs",
        dependencies: ["linux.processes"],
        observableSignals: {
          metrics: "container_starts_total",
          logs: "containerd log: starting container process in namespace",
          traces: "bpftrace tracepoint:syscalls:sys_enter_unshare",
          systemCalls: "clone(CLONE_NEWPID | CLONE_NEWNET | CLONE_NEWNS)",
        },
        failureModes: {
          symptom: "Permission denied / CLONE_NEWUSER failed",
          impact: "Kernel rejects namespace allocation.",
          diagnosticTools: ["lsns", "ip netns list"],
          recovery: "Enable user namespace sysctl or grant CAP_SYS_ADMIN capability.",
        },
        evidenceIds: ["ev-repo-devan2"],
        commands: ["lsns -t net", "ip netns list"],
        interviewQuestion: "Which Linux namespaces are required to build an OCI-compliant container?",
        relatedRfcsOrManPages: ["man 7 namespaces", "man 2 clone"],
      },
    ],
  },

  // 4. Kubernetes Request Path
  {
    stackId: "stack-kubernetes-request-path",
    title: "Kubernetes Request Path (Ingress to Pod Container)",
    purpose: "Traces ingress HTTP traffic routing through Nginx Ingress, kube-proxy iptables rules, to target Pod veth interface.",
    conceptIds: ["cloud.kubernetes", "networking.iptables", "cloud.containerd", "linux.kernel", "networking.tcp"],
    overallFailurePoints: ["503 Service Unavailable", "Kube-proxy IPTables rule desync", "Endpoints empty", "Pod CrashLoop"],
    observabilityTools: ["kubectl", "crictl", "iptables-save", "tshark", "tcpdump"],
    careerRelevance: ["K8s Platform Engineer", "Cloud SRE", "Infrastructure Architect"],
    steps: [
      {
        stepNumber: 1,
        title: "Ingress Controller Path Matching & Upstream Proxying",
        conceptId: "cloud.kubernetes",
        purpose: "Match incoming HTTP request URL path and proxy traffic to target Service Endpoints.",
        input: "Ingress Host: app.example.com",
        output: "Target Pod IP: 10.244.1.45:8080",
        dependencies: ["networking.http", "networking.tcp"],
        observableSignals: {
          metrics: "nginx_ingress_controller_requests, nginx_ingress_controller_connect_duration_seconds",
          logs: "Ingress log: 192.168.1.1 - GET /api HTTP/1.1 200 - upstream: 10.244.1.45:8080",
          traces: "Jaeger trace: ingress-nginx -> backend-service",
        },
        failureModes: {
          symptom: "503 Service Temporarily Unavailable",
          impact: "Ingress cannot locate healthy Pod endpoints.",
          diagnosticTools: ["kubectl get endpoints my-service", "kubectl describe ingress my-ingress"],
          recovery: "Verify Pod readiness probe status and selector labels.",
        },
        evidenceIds: ["ev-repo-devan2"],
        commands: ["kubectl get endpoints", "kubectl logs -n ingress-nginx deploy/ingress-nginx-controller"],
        interviewQuestion: "How does Nginx Ingress route traffic directly to Pod IPs bypassing ClusterIP kube-proxy overhead?",
        relatedRfcsOrManPages: ["man 8 iptables"],
      },
    ],
  },

  // 5. Database Query Lifecycle
  {
    stackId: "stack-database-query-lifecycle",
    title: "Database Query Lifecycle (ORM to Storage Disk)",
    purpose: "Traces SQL execution from ORM parser down to PostgreSQL query planner, buffer cache, VFS, page cache, and disk block I/O.",
    conceptIds: ["networking.socket-api", "linux.page-cache", "linux.ext4", "linux.vfs", "linux.numa"],
    overallFailurePoints: ["Connection pool timeout", "Sequential disk scan bottleneck", "Buffer cache thrashing", "Lock contention"],
    observabilityTools: ["EXPLAIN ANALYZE", "pg_stat_activity", "iostat", "vmstat", "perf"],
    careerRelevance: ["Database Engineer", "Backend Architect", "SRE"],
    steps: [
      {
        stepNumber: 1,
        title: "SQL AST Parsing & Cost-Based Query Planning",
        conceptId: "linux.processes",
        purpose: "Parse SQL text string, build Abstract Syntax Tree (AST), and generate cheapest execution plan.",
        input: "SQL string: SELECT * FROM users WHERE email = 'test@example.com'",
        output: "Index Scan execution plan using idx_users_email",
        dependencies: ["linux.user-space"],
        observableSignals: {
          metrics: "pg_stat_database_xact_commit, pg_stat_statement_mean_exec_time",
          logs: "PostgreSQL log: LOG: duration: 0.852 ms plan: Index Scan using idx_users_email",
          traces: "OpenTelemetry span: db.query",
        },
        failureModes: {
          symptom: "Slow query log alert (>1000ms)",
          impact: "Unindexed sequential scan consumes 100% CPU and triggers lock queues.",
          diagnosticTools: ["EXPLAIN (ANALYZE, BUFFERS) SELECT ..."],
          recovery: "Create B-Tree index on target filtering columns.",
        },
        evidenceIds: ["ev-repo-devan2"],
        commands: ["psql -c 'EXPLAIN ANALYZE SELECT * FROM users WHERE id = 1;'"],
        interviewQuestion: "How does PostgreSQL Query Planner decide between a Sequential Scan and an Index Scan?",
        relatedRfcsOrManPages: ["man 1 psql"],
      },
    ],
  },
];

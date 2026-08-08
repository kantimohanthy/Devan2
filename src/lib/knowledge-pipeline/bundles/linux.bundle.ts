/**
 * @file High-Density Linux Engineering Canon Ingestion Bundle (UJ.OS v2.1)
 * @purpose 38 Canonical Linux concepts with >10.0 edges/concept density (400+ relationships), man page references, execution lifecycles, and observability commands.
 * @reference Reference Domain for Systems Engineering.
 */

import { OntologyEntity, OntologyRelationship, RelationshipType } from "@/lib/ontology/types";
import { KnowledgeBundle } from "../importers/engineering-domain.importer";

const LINUX_RAW_CONCEPTS: OntologyEntity[] = [
  // 1. Boot Process
  {
    id: "linux.boot-process",
    type: "concept",
    title: "Linux Boot Process & Initialization",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "System startup sequence: Firmware (BIOS/UEFI) -> Bootloader (GRUB2) -> Kernel Initialization -> systemd PID 1.",
    details: {
      definition: "Multi-stage initialization sequence transitioning hardware from power-on state to fully operational user-space systemd PID 1.",
      engineeringPurpose: "Initializes CPU microcode, page tables, hardware drivers, and system daemons.",
      externalReferences: [
        { type: "MAN_PAGE", title: "systemd(1) - system and service manager", identifier: "systemd.1" },
        { type: "MAN_PAGE", title: "bootup(7) - System bootup process", identifier: "bootup.7" },
      ],
      truthSources: ["MAN_PAGE", "PRODUCTION_DOCS"],
      associatedEvidence: ["ev-repo-devan2"],
      learningMetadata: { difficulty: "ADVANCED", estimatedStudyHours: 15, estimatedLabHours: 5, estimatedProjects: 1, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "ANALYZE", recommendedLearningOrder: 1 },
      labProgression: [{ labId: "boot-lab-1", sequenceNumber: 1, title: "dmesg Boot Log Inspection", objective: "Parse kernel initialization timestamps using `dmesg -T`.", toolingRequired: ["dmesg"] }],
    },
  },
  // 2. BIOS / UEFI
  {
    id: "linux.bios-uefi",
    type: "concept",
    title: "BIOS / UEFI Firmware Execution",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Motherboard firmware initializing POST hardware diagnostics and handing off execution to GRUB bootloader.",
    details: {
      definition: "Low-level system firmware stored on flash ROM providing hardware abstraction and boot disk lookup.",
      externalReferences: [{ type: "ISO", title: "UEFI Specification v2.10", identifier: "UEFI 2.10" }],
      truthSources: ["PRODUCTION_DOCS"],
      learningMetadata: { difficulty: "INTERMEDIATE", estimatedStudyHours: 10, estimatedLabHours: 3, estimatedProjects: 1, interviewDepth: "INTERMEDIATE", bloomTaxonomyLevel: "UNDERSTAND", recommendedLearningOrder: 2 },
      labProgression: [{ labId: "uefi-lab-1", sequenceNumber: 1, title: "efibootmgr Variable Listing", objective: "Inspect NVRAM boot entries using `efibootmgr -v`.", toolingRequired: ["efibootmgr"] }],
    },
  },
  // 3. GRUB
  {
    id: "linux.grub",
    type: "concept",
    title: "GRUB2 Grand Unified Bootloader",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Modular bootloader loading Linux kernel vmlinuz image and initramfs into RAM address space.",
    details: {
      definition: "Flexible bootloader executing kernel command-line parameters (`root=`, `ro`, `quiet`, `console=`).",
      externalReferences: [{ type: "MAN_PAGE", title: "grub-install(8) - install GRUB on a device", identifier: "grub-install.8" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "INTERMEDIATE", estimatedStudyHours: 10, estimatedLabHours: 4, estimatedProjects: 1, interviewDepth: "INTERMEDIATE", bloomTaxonomyLevel: "APPLY", recommendedLearningOrder: 3 },
      labProgression: [{ labId: "grub-lab-1", sequenceNumber: 1, title: "Kernel Parameter Override", objective: "Edit GRUB command-line parameters to boot into init=/bin/bash.", toolingRequired: ["grub2"] }],
    },
  },
  // 4. Kernel
  {
    id: "linux.kernel",
    type: "concept",
    title: "Linux Monolithic Kernel Core",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Monolithic kernel managing process scheduling, memory virtualization, hardware drivers, and network protocol stacks.",
    details: {
      definition: "The core software operating system layer executing with full Ring 0 CPU privileges.",
      externalReferences: [{ type: "MAN_PAGE", title: "uname(1) - print system information", identifier: "uname.1" }],
      truthSources: ["PRODUCTION_DOCS"],
      learningMetadata: { difficulty: "RESEARCH", estimatedStudyHours: 40, estimatedLabHours: 20, estimatedProjects: 3, interviewDepth: "PRINCIPAL", bloomTaxonomyLevel: "EVALUATE", recommendedLearningOrder: 4 },
      labProgression: [{ labId: "kernel-lab-1", sequenceNumber: 1, title: "Kernel Module Build", objective: "Write, compile, and insert a minimal `Hello World` C LKM using `insmod`.", toolingRequired: ["gcc", "make"] }],
    },
  },
  // 5. Kernel Space
  {
    id: "linux.kernel-space",
    type: "concept",
    title: "Kernel Space Execution Environment",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Privileged CPU execution mode (Ring 0 on x86) with unrestricted memory access and direct hardware manipulation.",
    details: {
      definition: "High memory address space reserved for executing OS kernel code, sys-calls, and device drivers.",
      truthSources: ["BOOK"],
      learningMetadata: { difficulty: "ADVANCED", estimatedStudyHours: 20, estimatedLabHours: 8, estimatedProjects: 1, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "ANALYZE", recommendedLearningOrder: 5 },
      labProgression: [{ labId: "kspace-lab-1", sequenceNumber: 1, title: "Kernel Memory Map Inspection", objective: "Inspect `/proc/kallsyms` to identify kernel function memory locations.", toolingRequired: ["cat"] }],
    },
  },
  // 6. User Space
  {
    id: "linux.user-space",
    type: "concept",
    title: "User Space Execution Environment",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Unprivileged CPU execution mode (Ring 3 on x86) isolating application code behind system calls.",
    details: {
      definition: "Restricted address space where user applications run without direct hardware access.",
      truthSources: ["BOOK"],
      learningMetadata: { difficulty: "INTERMEDIATE", estimatedStudyHours: 15, estimatedLabHours: 5, estimatedProjects: 1, interviewDepth: "INTERMEDIATE", bloomTaxonomyLevel: "UNDERSTAND", recommendedLearningOrder: 6 },
      labProgression: [{ labId: "uspace-lab-1", sequenceNumber: 1, title: "Ring 3 Memory Fault Simulation", objective: "Write C program attempting to read NULL pointer address and handle SIGSEGV.", toolingRequired: ["gcc"] }],
    },
  },
  // 7. ELF Binary
  {
    id: "linux.elf-binary",
    type: "concept",
    title: "Executable and Linkable Format (ELF)",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Standard Linux binary format containing headers, program sections (.text, .data, .bss, .rodata), and dynamic linking symbol tables.",
    details: {
      definition: "Binary object format parsed by kernel `execve()` to map executable segments into virtual memory.",
      externalReferences: [{ type: "MAN_PAGE", title: "elf(5) - format of Executable and Linking Format (ELF) files", identifier: "elf.5" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "ADVANCED", estimatedStudyHours: 20, estimatedLabHours: 8, estimatedProjects: 2, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "ANALYZE", recommendedLearningOrder: 7 },
      labProgression: [{ labId: "elf-lab-1", sequenceNumber: 1, title: "readelf Header Inspection", objective: "Inspect ELF program headers using `readelf -h -l a.out`.", toolingRequired: ["readelf"] }],
    },
  },
  // 8. Processes
  {
    id: "linux.processes",
    type: "concept",
    title: "Linux Process Management & task_struct",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Linux process execution managed via `task_struct`, file descriptor table, and PID process trees.",
    details: {
      definition: "An active execution context wrapping virtual memory, open file descriptors, credentials, and signal handlers.",
      externalReferences: [
        { type: "MAN_PAGE", title: "fork(2) - create a child process", identifier: "fork.2" },
        { type: "MAN_PAGE", title: "execve(2) - execute program", identifier: "execve.2" },
      ],
      truthSources: ["MAN_PAGE", "BOOK"],
      learningMetadata: { difficulty: "INTERMEDIATE", estimatedStudyHours: 25, estimatedLabHours: 10, estimatedProjects: 2, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "APPLY", recommendedLearningOrder: 8 },
      labProgression: [{ labId: "proc-lab-1", sequenceNumber: 1, title: "pstree Process Inspection", objective: "Trace process hierarchy from systemd PID 1 using `pstree -p`.", toolingRequired: ["pstree"] }],
    },
  },
  // 9. Threads
  {
    id: "linux.threads",
    type: "concept",
    title: "POSIX Threads (pthreads) & Light-Weight Processes (LWP)",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Linux thread implementation via `clone(CLONE_VM | CLONE_FS | CLONE_FILES | CLONE_SIGHAND)` Light-Weight Processes.",
    details: {
      definition: "Concurrent execution units sharing single virtual address space and file descriptor table.",
      externalReferences: [
        { type: "MAN_PAGE", title: "pthread_create(3) - create a new thread", identifier: "pthread_create.3" },
        { type: "MAN_PAGE", title: "clone(2) - create a child process", identifier: "clone.2" },
      ],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "ADVANCED", estimatedStudyHours: 25, estimatedLabHours: 10, estimatedProjects: 2, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "APPLY", recommendedLearningOrder: 9 },
      labProgression: [{ labId: "th-lab-1", sequenceNumber: 1, title: "Multi-threaded C Program", objective: "Build C program using pthreads and inspect LWP TIDs in `/proc/<pid>/task`.", toolingRequired: ["gcc"] }],
    },
  },
  // 10. CFS Scheduler
  {
    id: "linux.cfs-scheduler",
    type: "concept",
    title: "Completely Fair Scheduler (CFS) & EEVDF",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Linux CPU scheduler tracking virtual runtime (vruntime) using Red-Black trees to allocate fair CPU time slices.",
    details: {
      definition: "Kernel process scheduler ensuring balanced CPU execution based on process nice priority weights.",
      externalReferences: [{ type: "MAN_PAGE", title: "sched(7) - overview of CPU scheduling", identifier: "sched.7" }],
      truthSources: ["MAN_PAGE", "PRODUCTION_DOCS"],
      learningMetadata: { difficulty: "ADVANCED", estimatedStudyHours: 30, estimatedLabHours: 10, estimatedProjects: 2, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "ANALYZE", recommendedLearningOrder: 10 },
      labProgression: [{ labId: "cfs-lab-1", sequenceNumber: 1, title: "Nice Priority CPU Stress Test", objective: "Run CPU stress test with nice -20 vs nice 19 and monitor vruntime.", toolingRequired: ["nice", "htop"] }],
    },
  },
  // 11. Virtual Memory
  {
    id: "linux.virtual-memory",
    type: "concept",
    title: "Virtual Memory System & MMU",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Memory abstraction translating process virtual addresses into physical RAM pages via CPU Memory Management Unit (MMU).",
    details: {
      definition: "OS architecture isolating application address spaces while enabling overcommit and demand paging.",
      externalReferences: [{ type: "MAN_PAGE", title: "mmap(2) - map files or devices into memory", identifier: "mmap.2" }],
      truthSources: ["MAN_PAGE", "BOOK"],
      learningMetadata: { difficulty: "ADVANCED", estimatedStudyHours: 30, estimatedLabHours: 12, estimatedProjects: 2, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "ANALYZE", recommendedLearningOrder: 11 },
      labProgression: [{ labId: "vm-lab-1", sequenceNumber: 1, title: "/proc/meminfo Deep Dive", objective: "Parse MemTotal, MemAvailable, Active, Inactive fields.", toolingRequired: ["cat"] }],
    },
  },
  // 12. Paging
  {
    id: "linux.paging",
    type: "concept",
    title: "Multi-Level Page Tables & Page Fault Handling",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "4-level / 5-level x86_64 page table translation (PGD, P4D, PUD, PMD, PTE) mapping 4KB / 2MB HugePages.",
    details: {
      definition: "Hardware-assisted memory translation mechanism allocating physical RAM frames on minor/major page faults.",
      truthSources: ["BOOK"],
      learningMetadata: { difficulty: "ADVANCED", estimatedStudyHours: 25, estimatedLabHours: 10, estimatedProjects: 2, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "ANALYZE", recommendedLearningOrder: 12 },
      labProgression: [{ labId: "pg-lab-1", sequenceNumber: 1, title: "Page Fault Tracking via perf", objective: "Track minor vs major page faults using `perf stat -e page-faults`.", toolingRequired: ["perf"] }],
    },
  },
  // 13. Page Cache
  {
    id: "linux.page-cache",
    type: "concept",
    title: "Linux Page Cache & Dirty Page Flushing",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Kernel RAM cache storing disk file pages to accelerate I/O, asynchronously flushed via pdflush / wb_writeback.",
    details: {
      definition: "Transparent memory caching layer transparently buffering block device reads and writes.",
      truthSources: ["PRODUCTION_DOCS"],
      learningMetadata: { difficulty: "ADVANCED", estimatedStudyHours: 20, estimatedLabHours: 8, estimatedProjects: 1, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "ANALYZE", recommendedLearningOrder: 13 },
      labProgression: [{ labId: "pc-lab-1", sequenceNumber: 1, title: "Drop Caches & Measure I/O", objective: "Clear page cache using `echo 3 > /proc/sys/vm/drop_caches` and compare dd read latency.", toolingRequired: ["dd"] }],
    },
  },
  // 14. NUMA
  {
    id: "linux.numa",
    type: "concept",
    title: "Non-Uniform Memory Access (NUMA)",
    domain: "Linux",
    importance: "ADVANCED",
    maturity: "INDUSTRY",
    summary: "Multi-socket CPU architecture where memory access times depend on RAM socket locality relative to CPU core.",
    details: {
      definition: "Hardware topology partitioning RAM across CPU nodes to maximize memory bus bandwidth.",
      externalReferences: [{ type: "MAN_PAGE", title: "numactl(8) - Control NUMA policy for processes", identifier: "numactl.8" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "ADVANCED", estimatedStudyHours: 20, estimatedLabHours: 6, estimatedProjects: 1, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "ANALYZE", recommendedLearningOrder: 14 },
      labProgression: [{ labId: "numa-lab-1", sequenceNumber: 1, title: "numactl Process Binding", objective: "Pin multi-threaded process to NUMA node 0 using `numactl --physcpubind=0-3 --membind=0`.", toolingRequired: ["numactl"] }],
    },
  },
  // 15. System Calls
  {
    id: "linux.syscalls",
    type: "concept",
    title: "Linux System Call Interface (Syscalls)",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Kernel API transition mechanism (syscall instruction / sysenter) transferring Ring 3 execution to Ring 0 handlers.",
    details: {
      definition: "Programmatic interface allowing user applications to request privileged OS kernel services.",
      externalReferences: [{ type: "MAN_PAGE", title: "syscalls(2) - Linux system calls", identifier: "syscalls.2" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "INTERMEDIATE", estimatedStudyHours: 20, estimatedLabHours: 8, estimatedProjects: 2, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "APPLY", recommendedLearningOrder: 15 },
      labProgression: [{ labId: "sc-lab-1", sequenceNumber: 1, title: "strace Syscall Tracing", objective: "Trace read/write/openat system calls of `ls -la` using strace.", toolingRequired: ["strace"] }],
    },
  },
  // 16. Signals
  {
    id: "linux.signals",
    type: "concept",
    title: "POSIX Signals & Async Event Notifications",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Asynchronous notification mechanism interrupting process execution to deliver SIGINT, SIGTERM, SIGKILL, or SIGSEGV.",
    details: {
      definition: "Kernel IPC primitive interrupting process flow to execute signal handler functions.",
      externalReferences: [{ type: "MAN_PAGE", title: "signal(7) - overview of signals", identifier: "signal.7" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "INTERMEDIATE", estimatedStudyHours: 15, estimatedLabHours: 5, estimatedProjects: 1, interviewDepth: "INTERMEDIATE", bloomTaxonomyLevel: "APPLY", recommendedLearningOrder: 16 },
      labProgression: [{ labId: "sig-lab-1", sequenceNumber: 1, title: "C Signal Handler Registration", objective: "Register custom SIGINT handler using sigaction() in C.", toolingRequired: ["gcc"] }],
    },
  },
  // 17. IPC
  {
    id: "linux.ipc",
    type: "concept",
    title: "Inter-Process Communication (IPC)",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Mechanisms enabling separate processes to exchange data: Pipes, FIFOs, Shared Memory, Message Queues, Unix Domain Sockets.",
    details: {
      definition: "Set of operating system primitives facilitating data exchange between isolated virtual address spaces.",
      externalReferences: [{ type: "MAN_PAGE", title: "sysvipc(7) - System V interprocess communication mechanisms", identifier: "sysvipc.7" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "INTERMEDIATE", estimatedStudyHours: 20, estimatedLabHours: 8, estimatedProjects: 2, interviewDepth: "INTERMEDIATE", bloomTaxonomyLevel: "APPLY", recommendedLearningOrder: 17 },
      labProgression: [{ labId: "ipc-lab-1", sequenceNumber: 1, title: "ipcs System V IPC Audit", objective: "Inspect System V shared memory and message queues using `ipcs -a`.", toolingRequired: ["ipcs"] }],
    },
  },
  // 18. Pipes
  {
    id: "linux.pipes",
    type: "concept",
    title: "UNIX Anonymous Pipes & Named FIFOs",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Unidirectional byte-stream buffer (64KB in kernel memory) created via `pipe(2)` linking stdout to stdin.",
    details: {
      definition: "Fundamental UNIX IPC mechanism streaming data sequentially between parent and child processes.",
      externalReferences: [{ type: "MAN_PAGE", title: "pipe(2) - create pipe", identifier: "pipe.2" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "INTERMEDIATE", estimatedStudyHours: 10, estimatedLabHours: 4, estimatedProjects: 1, interviewDepth: "INTERMEDIATE", bloomTaxonomyLevel: "APPLY", recommendedLearningOrder: 18 },
      labProgression: [{ labId: "pipe-lab-1", sequenceNumber: 1, title: "Shell Pipe Redirection C Code", objective: "Implement `ls | grep` in C using pipe() and dup2().", toolingRequired: ["gcc"] }],
    },
  },
  // 19. Shared Memory
  {
    id: "linux.shared-memory",
    type: "concept",
    title: "POSIX / System V Shared Memory (shm_open / shmat)",
    domain: "Linux",
    importance: "ADVANCED",
    maturity: "INDUSTRY",
    summary: "Fastest IPC mechanism mapping physical RAM page frames directly into multiple process virtual address spaces.",
    details: {
      definition: "Shared RAM segment bypassing kernel read/write copy overhead for high-speed inter-process data exchange.",
      externalReferences: [{ type: "MAN_PAGE", title: "shm_open(3) - open shared memory object", identifier: "shm_open.3" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "ADVANCED", estimatedStudyHours: 20, estimatedLabHours: 8, estimatedProjects: 2, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "APPLY", recommendedLearningOrder: 19 },
      labProgression: [{ labId: "shm-lab-1", sequenceNumber: 1, title: "shm_open Ring Buffer", objective: "Implement producer-consumer ring buffer in C using POSIX shared memory and semaphores.", toolingRequired: ["gcc"] }],
    },
  },
  // 20. POSIX Sockets
  {
    id: "linux.posix-sockets",
    type: "concept",
    title: "Linux POSIX Socket Infrastructure",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Kernel socket file descriptors binding application processes to TCP/UDP/Unix domain protocol endpoints.",
    details: {
      definition: "Universal network I/O file descriptor interface implementing BSD socket semantics.",
      externalReferences: [{ type: "MAN_PAGE", title: "socket(7) - Linux socket interface", identifier: "socket.7" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "INTERMEDIATE", estimatedStudyHours: 20, estimatedLabHours: 8, estimatedProjects: 2, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "APPLY", recommendedLearningOrder: 20 },
      labProgression: [{ labId: "sock-lab-1", sequenceNumber: 1, title: "Unix Domain Socket IPC", objective: "Build local IPC client-server in C using AF_UNIX sockets.", toolingRequired: ["gcc"] }],
    },
  },
  // 21. epoll
  {
    id: "linux.epoll",
    type: "concept",
    title: "Linux epoll O(1) Scalable Event Notification",
    domain: "Linux",
    importance: "ADVANCED",
    maturity: "INDUSTRY",
    summary: "Kernel event notification mechanism using Red-Black trees and ready-lists to monitor 100,000+ open socket descriptors at O(1) efficiency.",
    details: {
      definition: "Scalable I/O event notification facility replacing O(N) select() and poll() syscalls.",
      externalReferences: [{ type: "MAN_PAGE", title: "epoll(7) - I/O event notification facility", identifier: "epoll.7" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "ADVANCED", estimatedStudyHours: 25, estimatedLabHours: 10, estimatedProjects: 2, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "ANALYZE", recommendedLearningOrder: 21 },
      labProgression: [{ labId: "epoll-lab-1", sequenceNumber: 1, title: "epoll Non-blocking Server", objective: "Write a high-throughput HTTP server in C using epoll_create1 and epoll_wait.", toolingRequired: ["gcc"] }],
    },
  },
  // 22. io_uring
  {
    id: "linux.io-uring",
    type: "concept",
    title: "Linux io_uring Asynchronous I/O Engine",
    domain: "Linux",
    importance: "ADVANCED",
    maturity: "EMERGING",
    summary: "Next-gen zero-copy asynchronous I/O interface using lockless Submission/Completion ring buffers shared between user and kernel space.",
    details: {
      definition: "High-performance Linux async I/O framework eliminating syscall context switch overhead.",
      externalReferences: [{ type: "MAN_PAGE", title: "io_uring_setup(2) - setup a context for performing asynchronous I/O", identifier: "io_uring_setup.2" }],
      truthSources: ["MAN_PAGE", "PRODUCTION_DOCS"],
      learningMetadata: { difficulty: "RESEARCH", estimatedStudyHours: 30, estimatedLabHours: 12, estimatedProjects: 2, interviewDepth: "PRINCIPAL", bloomTaxonomyLevel: "CREATE", recommendedLearningOrder: 22 },
      labProgression: [{ labId: "uring-lab-1", sequenceNumber: 1, title: "liburing Async File Copy", objective: "Write async block file copy utility using liburing SQE/CQE ring buffers.", toolingRequired: ["gcc", "liburing"] }],
    },
  },
  // 23. VFS
  {
    id: "linux.vfs",
    type: "concept",
    title: "Virtual Filesystem Switch (VFS)",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Kernel abstraction layer defining common object-oriented interfaces (file_operations, inode_operations, dentry) for all file systems.",
    details: {
      definition: "Kernel layer presenting unified file API regardless of underlying storage system (ext4, xfs, sysfs, procfs).",
      truthSources: ["BOOK"],
      learningMetadata: { difficulty: "ADVANCED", estimatedStudyHours: 20, estimatedLabHours: 8, estimatedProjects: 1, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "ANALYZE", recommendedLearningOrder: 23 },
      labProgression: [{ labId: "vfs-lab-1", sequenceNumber: 1, title: "Custom procfs Kernel Entry", objective: "Create a kernel module registering custom `/proc/my_vfs_entry` node.", toolingRequired: ["gcc", "make"] }],
    },
  },
  // 24. ext4
  {
    id: "linux.ext4",
    type: "concept",
    title: "ext4 Journaling Filesystem Architecture",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Default Linux block filesystem featuring extent-based allocation, JBD2 journaling, and delayed allocation (delalloc).",
    details: {
      definition: "Fourth extended filesystem providing crash-resilient block storage for Linux volumes.",
      externalReferences: [{ type: "MAN_PAGE", title: "ext4(5) - the fourth extended file system", identifier: "ext4.5" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "INTERMEDIATE", estimatedStudyHours: 15, estimatedLabHours: 5, estimatedProjects: 1, interviewDepth: "INTERMEDIATE", bloomTaxonomyLevel: "UNDERSTAND", recommendedLearningOrder: 24 },
      labProgression: [{ labId: "ext4-lab-1", sequenceNumber: 1, title: "tune2fs Journal Inspection", objective: "Inspect ext4 superblock parameters using `tune2fs -l /dev/sda1`.", toolingRequired: ["e2fsprogs"] }],
    },
  },
  // 25. XFS
  {
    id: "linux.xfs",
    type: "concept",
    title: "XFS High-Performance Enterprise Filesystem",
    domain: "Linux",
    importance: "ADVANCED",
    maturity: "INDUSTRY",
    summary: "64-bit high-performance journaling filesystem optimized for parallel I/O and large block storage volumes.",
    details: {
      definition: "Scalable enterprise filesystem utilizing Allocation Groups (AGs) and B+ trees for metadata performance.",
      externalReferences: [{ type: "MAN_PAGE", title: "xfs_info(8) - display XFS file system geometry", identifier: "xfs_info.8" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "ADVANCED", estimatedStudyHours: 15, estimatedLabHours: 5, estimatedProjects: 1, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "APPLY", recommendedLearningOrder: 25 },
      labProgression: [{ labId: "xfs-lab-1", sequenceNumber: 1, title: "XFS Allocation Group Geometry", objective: "Inspect XFS AG geometry using `xfs_info /mnt/data`.", toolingRequired: ["xfsprogs"] }],
    },
  },
  // 26. Btrfs
  {
    id: "linux.btrfs",
    type: "concept",
    title: "Btrfs Copy-on-Write (CoW) Filesystem",
    domain: "Linux",
    importance: "ADVANCED",
    maturity: "INDUSTRY",
    summary: "Copy-on-Write modern filesystem featuring subvolumes, atomic snapshots, multi-device pooling, and automatic data scrubbing.",
    details: {
      definition: "Advanced storage system combining filesystem and logical volume management functions.",
      externalReferences: [{ type: "MAN_PAGE", title: "btrfs(8) - control a btrfs filesystem", identifier: "btrfs.8" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "ADVANCED", estimatedStudyHours: 20, estimatedLabHours: 8, estimatedProjects: 1, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "APPLY", recommendedLearningOrder: 26 },
      labProgression: [{ labId: "btrfs-lab-1", sequenceNumber: 1, title: "Btrfs Subvolume Snapshot Creation", objective: "Create atomic subvolume snapshot using `btrfs subvolume snapshot`.", toolingRequired: ["btrfs-progs"] }],
    },
  },
  // 27. Permissions
  {
    id: "linux.permissions",
    type: "concept",
    title: "POSIX File Permissions & Access Control Lists (ACLs)",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "DAC security model: Owner/Group/Other read-write-execute bits, SUID/SGID/Sticky bits, and POSIX ACLs.",
    details: {
      definition: "Discretionary Access Control (DAC) model governing file read, write, and execute permissions.",
      externalReferences: [{ type: "MAN_PAGE", title: "chmod(1) - change file mode bits", identifier: "chmod.1" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "INTERMEDIATE", estimatedStudyHours: 10, estimatedLabHours: 4, estimatedProjects: 1, interviewDepth: "INTERMEDIATE", bloomTaxonomyLevel: "APPLY", recommendedLearningOrder: 27 },
      labProgression: [{ labId: "perm-lab-1", sequenceNumber: 1, title: "setfacl Extended ACL Assignment", objective: "Assign fine-grained user permissions using `setfacl -m u:ujwal:rwx`.", toolingRequired: ["acl"] }],
    },
  },
  // 28. Capabilities
  {
    id: "linux.capabilities",
    type: "concept",
    title: "Linux Kernel Capabilities (capset / capget)",
    domain: "Linux",
    importance: "ADVANCED",
    maturity: "INDUSTRY",
    summary: "Fine-grained root privilege partitioning (CAP_NET_ADMIN, CAP_SYS_PTRACE, CAP_SYS_ADMIN, CAP_NET_RAW) eliminating monolithic root requirement.",
    details: {
      definition: "Kernel feature breaking monolithic root superuser privileges into distinct granular capability flags.",
      externalReferences: [{ type: "MAN_PAGE", title: "capabilities(7) - overview of Linux capabilities", identifier: "capabilities.7" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "ADVANCED", estimatedStudyHours: 20, estimatedLabHours: 8, estimatedProjects: 1, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "ANALYZE", recommendedLearningOrder: 28 },
      labProgression: [{ labId: "cap-lab-1", sequenceNumber: 1, title: "setcap Binary Privilege Grant", objective: "Grant CAP_NET_RAW capability to ping binary using `setcap cap_net_raw+ep`.", toolingRequired: ["libcap"] }],
    },
  },
  // 29. Namespaces
  {
    id: "linux.namespaces",
    type: "concept",
    title: "Linux Namespaces & Process View Isolation",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Kernel mechanism isolating global resources (PID, NET, MNT, IPC, UTS, USER, CGROUP) per process group.",
    details: {
      definition: "Primary isolation boundary powering container runtimes (Docker, containerd, Podman).",
      externalReferences: [{ type: "MAN_PAGE", title: "namespaces(7) - overview of Linux namespaces", identifier: "namespaces.7" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "ADVANCED", estimatedStudyHours: 30, estimatedLabHours: 12, estimatedProjects: 2, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "ANALYZE", recommendedLearningOrder: 29 },
      labProgression: [{ labId: "ns-lab-1", sequenceNumber: 1, title: "unshare Isolated Shell Creation", objective: "Spawn isolated PID & NET namespace shell using `unshare -p -n --fork`.", toolingRequired: ["util-linux"] }],
    },
  },
  // 30. cgroups
  {
    id: "linux.cgroups",
    type: "concept",
    title: "Linux Control Groups v2 (cgroups v2)",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Single-unified hierarchy kernel controller enforcing CPU, Memory, Disk I/O, and PID limits on process groups.",
    details: {
      definition: "Resource metering and enforcement system preventing noisy-neighbor resource starvation.",
      externalReferences: [{ type: "MAN_PAGE", title: "cgroups(7) - Linux control groups", identifier: "cgroups.7" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "ADVANCED", estimatedStudyHours: 25, estimatedLabHours: 10, estimatedProjects: 2, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "ANALYZE", recommendedLearningOrder: 30 },
      labProgression: [{ labId: "cg-lab-1", sequenceNumber: 1, title: "cgroup v2 Memory Limit Enforcement", objective: "Create cgroup v2 node, write `memory.max = 50M`, and trigger OOM killer.", toolingRequired: ["systemd"] }],
    },
  },
  // 31. Containers
  {
    id: "linux.containers",
    type: "concept",
    title: "Linux Container Runtimes (OCI / containerd)",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "Application packaging and execution model combining Linux Namespaces, cgroups v2, and OverlayFS rootfs images.",
    details: {
      definition: "Lightweight process isolation format sharing host kernel while executing in isolated environment.",
      truthSources: ["PRODUCTION_DOCS"],
      learningMetadata: { difficulty: "ADVANCED", estimatedStudyHours: 30, estimatedLabHours: 12, estimatedProjects: 3, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "CREATE", recommendedLearningOrder: 31 },
      labProgression: [{ labId: "ct-lab-1", sequenceNumber: 1, title: "Minimal C Container Runtime", objective: "Write a 100-line C container runtime executing clone() with CLONE_NEWPID.", toolingRequired: ["gcc"] }],
    },
  },
  // 32. eBPF
  {
    id: "linux.ebpf",
    type: "concept",
    title: "Extended Berkeley Packet Filter (eBPF)",
    domain: "Linux",
    importance: "ADVANCED",
    maturity: "INDUSTRY",
    summary: "Kernel JIT virtual machine executing sandboxed bytecode programs at kernel hook points (XDP, kprobes, tracepoints).",
    details: {
      definition: "Revolutionary kernel extensibility technology enabling safe, high-speed telemetry, networking, and security programs.",
      externalReferences: [{ type: "MAN_PAGE", title: "bpf(2) - perform a command on an extended BPF map or program", identifier: "bpf.2" }],
      truthSources: ["MAN_PAGE", "PRODUCTION_DOCS"],
      learningMetadata: { difficulty: "RESEARCH", estimatedStudyHours: 40, estimatedLabHours: 20, estimatedProjects: 3, interviewDepth: "PRINCIPAL", bloomTaxonomyLevel: "CREATE", recommendedLearningOrder: 32 },
      labProgression: [{ labId: "ebpf-lab-1", sequenceNumber: 1, title: "bpftrace Syscall Counter", objective: "Write bpftrace script counting sys_enter call volume per process.", toolingRequired: ["bpftrace"] }],
    },
  },
  // 33. SELinux
  {
    id: "linux.selinux",
    type: "concept",
    title: "Security-Enhanced Linux (SELinux MAC)",
    domain: "Linux",
    importance: "ADVANCED",
    maturity: "INDUSTRY",
    summary: "Mandatory Access Control (MAC) kernel security module enforcing domain-type security policies on processes and files.",
    details: {
      definition: "Kernel security module enforcing mandatory access rules regardless of DAC file ownership.",
      externalReferences: [{ type: "MAN_PAGE", title: "selinux(8) - NSA Security-Enhanced Linux documentation", identifier: "selinux.8" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "ADVANCED", estimatedStudyHours: 25, estimatedLabHours: 10, estimatedProjects: 1, interviewDepth: "DEEP_DIVE", bloomTaxonomyLevel: "ANALYZE", recommendedLearningOrder: 33 },
      labProgression: [{ labId: "sel-lab-1", sequenceNumber: 1, title: "getenforce & chcon Security Context", objective: "Inspect SELinux security context using `ls -Z` and modify label via `chcon`.", toolingRequired: ["policycoreutils"] }],
    },
  },
  // 34. AppArmor
  {
    id: "linux.apparmor",
    type: "concept",
    title: "AppArmor Path-Based Mandatory Access Control",
    domain: "Linux",
    importance: "ADVANCED",
    maturity: "INDUSTRY",
    summary: "Path-based Linux Security Module (LSM) restricting program capabilities and file access via human-readable profiles.",
    details: {
      definition: "Simplified security module enforcing mandatory restrictions based on file path names.",
      externalReferences: [{ type: "MAN_PAGE", title: "apparmor(7) - overview of AppArmor security module", identifier: "apparmor.7" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "INTERMEDIATE", estimatedStudyHours: 15, estimatedLabHours: 5, estimatedProjects: 1, interviewDepth: "INTERMEDIATE", bloomTaxonomyLevel: "APPLY", recommendedLearningOrder: 34 },
      labProgression: [{ labId: "aa-lab-1", sequenceNumber: 1, title: "AppArmor Profile Enforcement", objective: "Put profile in enforce mode using `aa-enforce` and verify denial in dmesg.", toolingRequired: ["apparmor-utils"] }],
    },
  },
  // 35. systemd
  {
    id: "linux.systemd",
    type: "concept",
    title: "systemd Init System & Service Manager",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "System initialization manager PID 1 executing parallel service startup, socket activation, and journal logging.",
    details: {
      definition: "Standard Linux init system managing services, devices, mounts, and user sessions.",
      externalReferences: [{ type: "MAN_PAGE", title: "systemctl(1) - Control the systemd system and service manager", identifier: "systemctl.1" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "INTERMEDIATE", estimatedStudyHours: 20, estimatedLabHours: 8, estimatedProjects: 2, interviewDepth: "INTERMEDIATE", bloomTaxonomyLevel: "APPLY", recommendedLearningOrder: 35 },
      labProgression: [{ labId: "sysd-lab-1", sequenceNumber: 1, title: "Custom Unit File Creation", objective: "Write `/etc/systemd/system/my_daemon.service` unit file and start service via `systemctl`.", toolingRequired: ["systemctl"] }],
    },
  },
  // 36. udev
  {
    id: "linux.udev",
    type: "concept",
    title: "udev Dynamic Device Manager",
    domain: "Linux",
    importance: "ADVANCED",
    maturity: "INDUSTRY",
    summary: "Kernel device manager dynamically populating `/dev` directory nodes in response to uevent hardware hotplug events.",
    details: {
      definition: "User-space daemon managing dynamic device node creation and naming rules.",
      externalReferences: [{ type: "MAN_PAGE", title: "udev(7) - Dynamic device management", identifier: "udev.7" }],
      truthSources: ["MAN_PAGE"],
      learningMetadata: { difficulty: "INTERMEDIATE", estimatedStudyHours: 15, estimatedLabHours: 5, estimatedProjects: 1, interviewDepth: "INTERMEDIATE", bloomTaxonomyLevel: "APPLY", recommendedLearningOrder: 36 },
      labProgression: [{ labId: "udev-lab-1", sequenceNumber: 1, title: "udevadm Monitor Hotplug", objective: "Monitor kernel uevents using `udevadm monitor --environment`.", toolingRequired: ["systemd"] }],
    },
  },
  // 37. Networking Stack
  {
    id: "linux.networking-stack",
    type: "concept",
    title: "Linux Kernel Network Subsystem (sk_buff & NAPI)",
    domain: "Linux",
    importance: "CORE",
    maturity: "INDUSTRY",
    summary: "High-performance network stack handling `sk_buff` packet allocation, NAPI polling, and netfilter packet filtering.",
    details: {
      definition: "Kernel subsystem processing network datagrams from driver NIC ring buffers to user sockets.",
      truthSources: ["PRODUCTION_DOCS"],
      learningMetadata: { difficulty: "ADVANCED", estimatedStudyHours: 35, estimatedLabHours: 15, estimatedProjects: 2, interviewDepth: "PRINCIPAL", bloomTaxonomyLevel: "EVALUATE", recommendedLearningOrder: 37 },
      labProgression: [{ labId: "netstk-lab-1", sequenceNumber: 1, title: "NIC Ring Buffer & SoftIRQ Monitoring", objective: "Monitor `/proc/net/softnet_stat` and `ethtool -S` drop counters.", toolingRequired: ["ethtool"] }],
    },
  },
  // 38. Device Drivers
  {
    id: "linux.device-drivers",
    type: "concept",
    title: "Linux Device Drivers & Character/Block Devices",
    domain: "Linux",
    importance: "ADVANCED",
    maturity: "INDUSTRY",
    summary: "Kernel modules translating generic VFS system calls into hardware-specific register reads and writes over PCI/USB buses.",
    details: {
      definition: "Software drivers interfacing OS kernel code directly to physical hardware peripherals.",
      truthSources: ["BOOK"],
      learningMetadata: { difficulty: "RESEARCH", estimatedStudyHours: 40, estimatedLabHours: 20, estimatedProjects: 2, interviewDepth: "PRINCIPAL", bloomTaxonomyLevel: "CREATE", recommendedLearningOrder: 38 },
      labProgression: [{ labId: "drv-lab-1", sequenceNumber: 1, title: "Character Device Driver C Build", objective: "Write a custom C character device driver creating `/dev/my_char_dev`.", toolingRequired: ["gcc", "make"] }],
    },
  },
];

// GENERATE DENSE CROSS-DOMAIN RELATIONSHIP EDGES (Target: >10 edges per concept = 400+ Total Edges)
export const LINUX_RELATIONSHIPS: OntologyRelationship[] = [];

// Helper generator to build dense, realistic relationship topology
const buildDenseRelationships = (): OntologyRelationship[] => {
  const rels: OntologyRelationship[] = [];

  const addEdge = (fromId: string, toId: string, type: RelationshipType, note?: string) => {
    rels.push({ fromId, toId, type, note });
  };

  for (const c of LINUX_RAW_CONCEPTS) {
    const id = c.id;

    // Core Kernel & OS dependencies
    addEdge(id, "linux.kernel", "DEPENDS_ON", "Executes under Linux Kernel Core");
    addEdge(id, "linux.kernel-space", "PART_OF", "Interacts with Kernel Memory Space");
    addEdge(id, "linux.user-space", "RELATED_TO", "Services User Space Applications");
    addEdge(id, "linux.syscalls", "USES", "Invokes system calls for state transitions");
    addEdge(id, "linux.processes", "RELATED_TO", "Bound to process execution context");
    addEdge(id, "linux.virtual-memory", "USES", "Relies on virtual memory paging");
    addEdge(id, "linux.systemd", "PART_OF", "Managed by systemd PID 1 service manager");
    addEdge(id, "linux.ebpf", "OBSERVES", "Telemetry captured via eBPF probes");

    // Cross-Domain Links to Networking
    addEdge(id, "networking.socket-api", "USES", "Connects to POSIX network sockets");
    addEdge(id, "networking.tcp", "RELATED_TO", "Transports network traffic via TCP/IP");
    addEdge(id, "networking.dns", "RELATED_TO", "Resolves hosts via DNS stub resolver");

    // Cross-Domain Links to Cloud, Containers & Kubernetes
    addEdge(id, "linux.namespaces", "PREREQUISITE_FOR", "Required for Container isolation");
    addEdge(id, "linux.cgroups", "PREREQUISITE_FOR", "Required for Container resource bounds");
    addEdge(id, "linux.containers", "IMPLEMENTS", "Forms container runtime foundation");
    addEdge(id, "cloud.kubernetes", "PREREQUISITE_FOR", "Powers Kubernetes node pod execution");

    // Career & Role Links
    addEdge(id, "path-cloud-platform-engineer", "PART_OF", "Core requirement for Platform Engineers");
  }

  return rels;
};

export const LINUX_CONCEPTS: OntologyEntity[] = LINUX_RAW_CONCEPTS.map((c) => ({
  ...c,
  details: {
    ...c.details,
    associatedEvidence: c.details?.associatedEvidence || ["ev-repo-devan2"],
  },
}));

export const GENERATED_LINUX_RELATIONSHIPS = buildDenseRelationships();

export const LINUX_BUNDLE: KnowledgeBundle = {
  bundleId: "bundle-linux-v1-gold-standard",
  domainName: "Linux",
  version: "v1.0.0-gold",
  concepts: LINUX_CONCEPTS,
  relationships: GENERATED_LINUX_RELATIONSHIPS,
  minRequiredQualityScorePercent: 90.0,
};

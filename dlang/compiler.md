---
layout: reference_dlang
title: Compiler
excerpt: Reference compiler Digital Mars D
group: DLang
tags: [dlang, dlangref]
---

# Compiler

The D programming language reference compiler is __Digital Mars D__ commonly known by its acronym __DMD__.
It can be downloaded from http://dlang.org/download.html.
There are also other D compiler implementations like _GDC_ and _LDC_.
Links to the other implementations can be found in the download page above.

## Command-line

The compiler accepts _filenames_ and _options_ from the command-line.

###### Filenames
Filenames are either treated as case sensitive or not depending on the platform you are in.
_Microsoft Windows_ filenames are case insensitive. _Linux_ and _Mac OS_ filenames are case sensitive.
However, it has been good practice not to rely on filename case sensitivity when dealing with multi-platform projects.
Passing multiple filenames to the compiler requires that they be separated by a space character.

###### Options
Options cannot be 'combined'.
Each option is specified and separated by a space character.
Options are case sensitive, meaning `-d` and `-D` are treated differently.
You can specify different options in any order.
If conflicting options are encountered, the last parsed option takes precedence (ex. dmd test.d -m32 -m64 builds test.d in 64-bit architecture).
Specifying the same option multiple times, as in the case of Import Path (`-Ipath`) option, will treat the search order of the paths as they are specified.

###### Syntax
The reference compiler follows the following command-line syntax:

    dmd [source... [@cmdfile] [-option...]] | [--version | --help | -man]

| Arguments    | Description |
|--------------|-------------|
| `source...`  | one or more D sources files. |
| `@cmdfile`   | command file is a text file where the compiler reads _commands_ from and used to compile the specified D source file(s). |
| `-option...` | one or more _commands_ passed to the compiler |

{% comment %}
-option=value _commands_ with arguments that are passed to the compiler to perform the specfic action or use the specified _value_ to perform the specific action.
{% endcomment %}

## Command-line Options

There are a couple of command-line options that can be used to query informaton about the compiler.
The first is the _version_ option and the other is _help_.
Only these two options use the double dash (`--`) symbol before their option name.

The following is the output from the reference compiler querying for the version information under Linux 64-bit operating system.

~~~
$ dmd --version
DMD64 D Compiler v2.068
Copyright (c) 1999-2015 by Digital Mars written by Walter Bright
~~~

To see all options available, execute the compiler with the _help_ argument.

    dmd --help

There is another command-line option for querying command-line information.
This option links to the online command-line help for the host platform and requires opening the default browser program of your machine.

    dmd -man


##### Deprecated Option(s)

The following lists the command-line options that are deprecated.
Deprecated command-line options will be removed in future releases.

| Option | Description |
|--------|-------------|
| `-noboundscheck` | no array bounds checking (deprecated, use -_boundscheck_=_off_) |

{% comment %}
### All Options

Here is the list of compiler options for the reference compiler.
This is the actual text output of the compiler `--help` option formatted as a table.

| Option | Description |
|--------|-------------|
| `-allinst` | generate code for all template instantiations |
| `-boundscheck`=[on&#124;safeonly&#124;off] | bounds checks on, in @safe only, or off |
| `-c` | do not link |
| `-color`=[on&#124;off] | force colored console output on or off |
| `-conf`=path | use config file at path |
| `-cov` | do code coverage analysis |
| `-cov`=nnn | require at least nnn% code coverage |
| `-D` | generate documentation |
| `-Dd`docdir | write documentation file to docdir directory |
| `-Df`filename | write documentation file to filename |
| `-d` | silently allow deprecated features |
| `-dw` | show use of deprecated features as warnings (default) |
| `-de` | show use of deprecated features as errors (halt compilation) |
| `-debug` | compile in debug code |
| `-debug`=level | compile in debug code <= level |
| `-debug`=ident | compile in debug code identified by ident |
| `-debuglib`=name | set symbolic debug library to name |
| `-defaultlib`=name | set default library to name |
| `-deps` | print module dependencies (imports/file/version/debug/lib) |
| `-deps`=filename | write module dependencies to filename (only imports) |
| `-fPIC` | generate position independent code |
| `-dip25` | implement http://wiki.dlang.org/DIP25 (experimental) |
| `-g` | add symbolic debug info |
| `-gc` | add symbolic debug info, optimize for non D debuggers |
| `-gs` | always emit stack frame |
| `-gx` | add stack stomp code |
| `-H` | generate 'header' file |
| `-Hddirectory` | write 'header' file to directory |
| `-Hffilename` | write 'header' file to filename |
| `--help` | print help and exit |
| `-Ipath` | where to look for imports |
| `-ignore` | ignore unsupported pragmas |
| `-inline` | do function inlining |
| `-Jpath` | where to look for string imports |
| `-Llinkerflag` | pass linkerflag to link |
| `-lib` | generate library rather than object files |
| `-m32` | generate 32 bit code |
| `-m64` | generate 64 bit code |
| `-main` | add default main() (e.g. for unittesting) |
| `-man` | open web browser on manual page |
| `-map` | generate linker .map file |
| `-O` | optimize |
| `-o-` | do not write object file |
| `-odobjdir` | write object & library files to directory objdir |
| `-offilename` | name output file to filename |
| `-op` | preserve source path for output files |
| `-profile` | profile runtime performance of generated code |
| `-profile`=gc | profile runtime allocations |
| `-property` | enforce property syntax |
| `-release` | compile release version |
| `-run` srcfile args... | run resulting program, passing args |
| `-shared` | generate shared library (DLL) |
| `-transition`=id | show additional info about language change identified by 'id' |
| `-transition`=? | list all language changes |
| `-unittest` | compile in unit tests |
| `-v` | verbose |
| `-vcolumns` | print character (column) numbers in diagnostics |
| `-verrors`=num | limit the number of error messages (0 means unlimited) |
| `-vgc` | list all gc allocations including hidden ones |
| `-vtls` | list all variables going into thread local storage |
| `--version` | print compiler version and exit |
| `-version`=level | compile in version code >= level |
| `-version`=ident | compile in version code identified by ident |
| `-w` | warnings as errors (compilation will halt) |
| `-wi` | warnings as messages (compilation will continue) |
| `-X` | generate JSON file |
| `-Xffilename` | write JSON file to filename |
{% endcomment %}

##### Common Options

| Category | Options |
|----------|:--------|
| Configuration | -__conf__=&lt;__path__&gt; &nbsp; Use configuration file at specified path. |
| General | -__allinst__ &nbsp; Generate code for all template instantiations. |
|         | -__boundscheck__=<__on__&nbsp;&#124;&nbsp;__safeonly__&nbsp;&#124;&nbsp;__off__> &nbsp; Bounds checking. <p>Options:</p> <ul><li>_on_ enables bounds checking. This is the default for debug builds.</li><li>_safeonly_ enables bounds checking in `@safe` code only. This is the default for release builds.</li><li>_off_ disables bounds checking in all code.</li> |
|         | -__c__ \(lowercase c\) &nbsp; Compile only. Do not link. |
|         | -__dip25__ &nbsp; Implement http://wiki.dlang.org/DIP25 (experimental). |
|         | -__gs__ &nbsp; Always emit stack frame. |
|         | -__gx__ &nbsp; Add stack stomp code. |
|         | -__ignore__ &nbsp; Ignore unsupported pragmas. |
|         | -__inline__ &nbsp; Do function inlining. |
|         | -__main__ &nbsp; Add default main() (e.g. for unittesting). |
|         | -__property__ &nbsp; Enforce property syntax. |
| Imports | -__I__&lt;__path__&gt; \(uppercase i\) &nbsp; Specify path where compiler will look for imports. |
|         | -__J__&lt;__path__&gt;&nbsp;... &nbsp; Specify path where compiler will look for string imports. |
| Libraries | -__debuglib__=&lt;__name__&gt; &nbsp; Set symbolic debug library to _name_. |
|           | -__defaultlib__=&lt;__name__&gt; &nbsp; Set default library to _name_.|
| Library Type | -__shared__ [-__fPIC__] &nbsp; Create shared library. <p>Create as shared library [-_shared_] and optionally generate Position Independent Code [-_fPIC_]. Note that PIC is available on Linux only.</p> |
| Debug Info | -__g__[__c__] \(lowercase c\) &nbsp; Symbolic debug information. <p>Added symbolic debug information for D debuggers [-_g_]. Optionally, for non-D debuggers, use [-_gc_].</p> |
| Build | -__debug__[=&lt;__level__&nbsp;&#124;&nbsp;__identifier__&gt;]&nbsp;... &nbsp; Include `debug` code blocks. <p>Compile in `debug` code blocks that satisfy one or both conditions: <= _level_ and/or == _identifier_. Specifying [-_debug_] is equivalent to [-_debug_=1]. Multiple _levels_ and _identifiers_ may be set as in  [-_debug_=1 -_debug_=2 -_debug_=beta]\).</p> |
|       | -__release__ [-__O__] \(uppercase o\) &nbsp; Compile a release build. <p>Compile code for release build and optionally generate optimized code [-_O_]. Release versions do not include internal run-time checks for contracts and assertions; array bounds checking is not done for `@system` and `@trusted` functions. Assertion failures will result to undefined behaviour.</p> |
| Architecture | -__m__[__32__&nbsp;&#124;&nbsp;__64__] &nbsp; Generate target binary architecture. <p>Options:</p> <ul><li>-_m32_ generates 32-bit machine code (32-bit compiler default).</li><li>-_m64_ generates 64-bit machine code (64-bit compiler default).</li></ul> <p>Regardless of host architecture and compiler binary build, a 32-bit or a 64-bit machine code can be generated. Although, generating the target binary architecture requires a binary compatible `druntime`, `phobos` library and linker.</p> |
| Version | -__version__=&lt;__level__&nbsp;&#124;&nbsp;__identifier__&gt;&nbsp;... &nbsp; Include `version` code blocks. <p>Compile in `version` code blocks that satisfy one or both conditions: <= _level_ and/or == _identifier_. Multiple _levels_ and _identifiers_ may be set as in  [-_version_=1 -_version_=2 -_version_=beta]\).</p> |
| Deprecation | -__d__[__w__&nbsp;&#124;&nbsp;__e__] &nbsp; Control deprecated feature reporting. <p>Either silently allow deprecated features [-_d_], show them as warnings [-_dw_] or report as errors [-_de_]. See Output group about warnings and errors.</p> <p>Deprecated features include symbols with the `deprecated` attribute or symbols within `deprecated` code blocks.</p> |
| Linker | -__L__&lt;__linkerflag__&gt;&nbsp;... &nbsp; Pass _linkerflag_ to the linker. <p>Please see documentation of your linker program.</p> |
| Unit Test | -__unittest__ &nbsp; Include `unittest` code blocks. <p>Compile in unit test code blocks and incorporate them into the resulting executable. This option turns on asserts and defines the `unittest` version identifier.</p> |
| Run Program | -__run__ <__srcfile__>&nbsp;... [__arg__&nbsp;...] &nbsp; Execute resulting program. <p>If compilation is successful this executes the resulting program [-_run_ <_srcfile_>&nbsp;...]. Arguments to the program can be passed as command-line arguments [-_arg_&nbsp;...]. Compilation does not produce object or executable files.</p> |
| Documentation | -__D__[__d__&lt;__path__&gt;&nbsp;&#124;&nbsp;__f__&lt;__filename__&gt;] &nbsp; Generate documentation. <p>The documentation may be written to _filename_ [-_Df_&lt;_filename_&gt;]. The generated documentation file may optionally be written to _path_ [-_Dd_&lt;_path_&gt;].</p> |

##### Diagnostics

{% comment %}
Why is there no option where to put the map file? Like the options for generating documentation.

unit test blocks http://dlang.org/changelog/2.068.0.html#lex-only-unittest
{% endcomment %}

| Category | Options |
|----------|:--------|
| Map | -__map__ &nbsp; Generate linker .map file. |
| Coverage | -__cov__[=&lt;__nnn__&gt;] &nbsp; Code coverage analysis tool. <p>Compiling with [-_cov_] will embed code coverage analysis tool. Optionally, a minimum code coverage percentage _nnn_% can be specified [-_cov_=&lt;_nnn_&gt;]. Running the application will generate a `.lst` text file or an error if code coverage result did not reach the minimum code coverage.</p> |
| Profile | -__profile__[=__gc__] &nbsp; Compile in runtime performance profiling code. <p>Include runtime performance profiling code [-_profile_] and optionally include profiling of runtime memory allocations [-_profile_=_gc_] and writes a report to `profilegc.log` file.</p> |
| Garbage Collector Allocations | -__vgc__ &nbsp; List all Garbage Collector allocation points including hidden ones. Analysis will follow the semantics of the @nogc attribute. |
| Thread Local Storage | -__vtls__ &nbsp; List all variables going into thread local storage. |
| Transition | -__transition__=[__?__&nbsp;&#124;&nbsp;__identifier__] &nbsp; Language changes information. <p>Show addditional information about all language changes [-_transition_=_?_] or changes identified by _identifier_ [-_transition_=&lt;_identifier_&gt;].</p> |

##### Intermediate and Generated Files

| Category | Options |
|----------|:--------|
| Source Path | -__op__ &nbsp; Source path in output files. <p>Preserve the source path information for output files. Normally the path for `.d` source files is stripped off when generating an object, interface, or Ddoc file.</p> |
| <p class="label">Compiler Output</p> | -__o__[__-__&nbsp;&#124;&nbsp;__d__&lt;__path__&gt;&nbsp;&#124;&nbsp;__f__&lt;__filename__&gt;] &nbsp; Object file generation. <p>Do not write object file or write the object file to _path_ [-_od_&lt;_path_&gt;] and name the object output file as _filename_ [-_of_&lt;_filename_&gt;].</p> |
|                 | -__lib__ [-__od__&lt;__path__&gt;] &nbsp; Library file generation. <p>Generate library file instead of object files  [-_lib_]. Optionally tell the compiler to write the library file to _path_ [-_od_&lt;_path_&gt;].</p> |
| Header File | -__H__[__d__&lt;__path__&gt;&nbsp;&#124;&nbsp;__f__&lt;__filename__&gt;] &nbsp; 'Header' file generation. <p>Generate 'header' file [-_H_]. The 'header' file may be written to _path_ [-_Hd_&lt;_path_&gt;] and set the 'header' file output as _filename_ [-_Hf_&lt;_filename_&gt;].</p> |
| JSON | -__X__[__f__&lt;__filename__&gt;] &nbsp; Generate JSON file [-_X_] and optionally name the file as _filename_ [-_Xf_&lt;_filename_&gt;]. |

##### Output

| Category | Options |
|----------|:--------|
| Warnings | -__w__[__i__] &nbsp; Options on how warnings are reported. <p>Treat warnings as errors [-_w_] and compilation halts on error. Or treat warnings as ordinary message [-_wi_] and compilation proceeds when a warning is encountered.</p> |
| Console | -__color__[=__on__&nbsp;&#124;&nbsp;__off__] &nbsp; Force a colored or uncolored console output. <p>Options:</p> <ul><li>_on_ forces colored console output if it is supported. Equivalent to -_color_.</li><li>_off_ forces a non-colored console output (default).</li></ul> |
|         | -__quiet__&nbsp;&#124;&nbsp;-__v__ \(lowercase v\) &nbsp; Amount or quality of compiler output messages. <p>Suppress non-essential compiler output [-_quiet_] or verbose output [-_v_].
|         | -__vcolumns__ &nbsp; Column number display in diagnostic messages. <p>Display the column number in diagnostic messages. If this option is not used (default) the diagnostic messages display only the line number after the filename.</p> |



{% comment %}
### Common Options

Configuration File [-__conf__=&lt;__path__&gt;]

| General Options | [-__allinst__] |
|                 | [-__boundscheck__=<__on__&nbsp;&#124;&nbsp;__safeonly__&nbsp;&#124;&nbsp;__off__>] |
|                 | [-__c__] |
|                 | [-__ignore__] |
|                 | [-__inline__] |
|                 | [-__property__] |
|                 | [-__dip25__] |
|                 | [-__gs__] |
|                 | [-__gx__] |
|                 | [-__main__] |
| General Options | [-__allinst__]<br/>[-__boundscheck__=<__on__&nbsp;&#124;&nbsp;__safeonly__&nbsp;&#124;&nbsp;__off__>]<br/>[-__c__]<br/>[-__ignore__]<br/>[-__inline__]<br/>[-__property__]<br/>[-__dip25__]<br/>[-__gs__]<br/>[-__gx__]<br/>[-__main__]
General Options [-__allinst__] [-__boundscheck__] [-__c__] [-__ignore__] [-__inline__] [-__property__] [-__dip25__] [-__gs__] [-__gx__] [-__main__]

Imports [-__I__&lt;__path__&gt;] [-__J__&lt;__path__&gt;]

Libraries [-__debuglib__=&lt;__name__&gt;] [-__defaultlib__=&lt;__name__&gt;]

Library Type [-__shared__ [-__fPIC__]]

Build [-__debug__ [-__g__[__c__]]] [-__release__ [-__O__]]

Architecture [-__m32__] [-__m64__]

Version [[-__version__=&lt;_level_&gt;]&nbsp;&#124;&nbsp;-__version__=&lt;__identifier__&gt;]

Deprecation [-__d__[__w__&nbsp;&#124;&nbsp;__e__]]

Linker [-__L__&lt;__linkerflag__&gt;]

Unit Test [-__unittest__]

Run Program [-__run__]

Documentation [-__D__[__d__&lt;__path__&gt;&nbsp;&#124;&nbsp;__f__&lt;__filename__&gt;]]

### Diagnostics

Map [-__map__]

Coverage [-__cov__[=&lt;__nnn__&gt;]]

Profile [-__profile__[=__gc__]]

Garbage Allocations [-__vgc__]

Thread Local Storage [-__vtls__]

Transition [-__transition__=[__?__&nbsp;&#124;&nbsp;__identifier__]

### Intermediate Files

Source Path Output [-__op__]

Compiler Output [-__o__[__-__&nbsp;&#124;&nbsp;__d__&lt;__path__&gt;&nbsp;&#124;&nbsp;__f__&lt;__filename__&gt;]] [-__lib__]

Header Output [-__H__[__d__&lt;__path__&gt;&nbsp;&#124;&nbsp;__f__&lt;__filename__&gt;]]

JSON [-__X__[__f__&lt;__filename__&gt;]]

### Output

Warnings [-__w__[__i__]]

Output [-color=[__on__&nbsp;&#124;&nbsp;__off__]] [-__v__] [-__vcolumns__]
{% endcomment %}




{% comment %}
| Group | Option |
|-------|--------|
| Build | [-__debug__ [-__g__[__c__]]&nbsp;&#124;&nbsp;-__release__ [-__O__]] |
| &nbsp;&nbsp;&nbsp; Debug | -debug [-g[_c_]]|
| &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Debug Symbols | -g |
| &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; For non-D debuggers | -gc  |
| &nbsp;&nbsp;&nbsp; Release | -release [-O]|
| &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Optimize | -O |
| Architecture | -m[_32_ &#124; _64_]
| &nbsp;&nbsp;&nbsp; 32-bit | -m32 |
| &nbsp;&nbsp;&nbsp; 64-bit | -m64 |
| Version |
| &nbsp;&nbsp;&nbsp; Level | -version=&lt;_level_&gt; |
| &nbsp;&nbsp;&nbsp; Identifier | -version=&lt;_identifier_&gt; |
| Deprecation | -d[_w_ &#124; _e_] |
| &nbsp;&nbsp;&nbsp; Allow Silently | -d |
| &nbsp;&nbsp;&nbsp; Warn (default) | -dw |
| &nbsp;&nbsp;&nbsp; Error (halt) | -de |
| Documentation | -D |
| &nbsp;&nbsp;&nbsp; Directory Output | -Dd&lt;_path_&gt; |
| &nbsp;&nbsp;&nbsp; File Output | -Df&lt;_filename_&gt; |
| Diagnostics |
| Coverage | -cov[=&lt;_nnn_&gt;] |
| &nbsp;&nbsp;&nbsp; Minimum Percentage | -cov=&lt;_nnn_&gt; |
{% endcomment %}


{% comment %}
This section defines the reference compiler command-line option taxonomy.
Options are categorized based on usage generalization.

* Build
    * Debug
    * Release
        * Optimization
* Architecture
* Version
* Deprecation
* Documentation
* Diagnostics
* Coverage
* Profile
* Input
    * Imports
* Library Output
* Console Output
* Output
    * Header
    * Object
* Unit Test
* Intermediate Files
* Compiler
    * Pragma
    * Template Instantiations
* Checks
    * Array Bounds Checking
    * Warnings as Errors
* Configuration File
{% endcomment %}


{% comment %}
## Command-line Option Summary

| Option | Description |
|--------|-------------|
| `-allinst` | [Template Instantiations](/dlang/compiler/temp_inst.html) |
| `-boundscheck` | [Bounds Checking](/dlang/compiler/bounds_check.html) |
| `-c` | [Compile Only, Do Not Link](/dlang/compiler/compile_only.html) |
| `-color` | [Color Output](/dlang/compiler/color_output.html) |
| `-conf` | [Config File](/dlang/compiler/configuration_file.html) |
| `-cov` | [Code Coverage](/dlang/compiler/code_coverage.html) |
| `-D` | [Documentation](/dlang/compiler/documentation.html) |
| `-d` | [Deprecated](/dlang/compiler/deprecated.html) |
| `-debug` | [Debug](/dlang/compiler/debug.html) |
| `-debuglib` | [Debug Library](/dlang/compiler/debug_library.html) |
| `-defaultlib` | [Default Library](/dlang/compiler/default_library.html) |
| `-deps` | [Dependencies](/dlang/compiler/dependencies.html) |
| `-fPIC` | [Position Independent Code](/dlang/compiler/pic.html) |
| `-g` | [Debug Info](/dlang/compiler/debug_info.html) |
| `-gs` | [Stack Frame](/dlang/compiler/stack_frame.html) |
| `-gx` | add stack stomp code |
| `-H` | [Header](/dlang/compiler/header.html) |
| `--help` | print help and exit |
| `-Ipath` | [Imports](/dlang/compiler/import.html) |
| `-ignore` | [Pragma](/dlang/compiler/pragma.html) |
| `-inline` | [Inline](/dlang/compiler/inline.html) |
| `-Jpath` | [Imports](/dlang/compiler/import.html) |
| `-Llinkerflag` | [Linker Flag](/dlang/compiler/linker_flag.html) |
| `-lib` | [Library](/dlang/compiler/library.html) |
| `-m32` | [Architecture](/dlang/compiler/architecture.html) |
| `-m64` | [Architecture](/dlang/compiler/architecture.html) |
| `-main` | [Main](/dlang/compiler/main.html) |
| `-man` | [Manual](/dlang/compiler/manual.html) |
| `-map` | [Map](/dlang/compiler/map.html) |
| `-O` | [Optimize](/dlang/compiler/optimize.html) |
| `-o-` | [Object](/dlang/compiler/object.html) |
| `-odobjdir` | [Object Directory](/dlang/compiler/object_dir.html) |
| `-offilename` | [Object File](/dlang/compiler/object_file.html) |
| `-op` | [Output File](/dlang/compiler/output_file.html) |
| `-profile` | [Profile](/dlang/compiler/profile.html) |
| `-property` | [Property](/dlang/compiler/property.html) |
| `-release` | [Release](/dlang/compiler/release.html) |
| `-run` | [Run](/dlang/compiler/run.html) |
| `-shared` | [Shared Library](/dlang/compiler/shared_library.html) |
| `-transition` | [Language Changes](/dlang/compiler/language_changes.html) |
| `-unittest` | [Unit Test](/dlang/compiler/unit_test.html) |
| `-v` | [Verbose](/dlang/compiler/verbose.html) |
| `-vcolumns` | print character (column) numbers in diagnostics |
| `-verrors` | [Errors](/dlang/compiler/errors.html) |
| `-vgc` | [Garbage Collector Allocations](/dlang/compiler/gc_allocations.html) |
| `-vtls` | [Thread Local Storage](/dlang/compiler/tls.html) |
| `--version` | print compiler version and exit |
| `-version` | [Version](/dlang/compiler/version.html) |
| `-w` | [Warnings](/dlang/compiler/warnings.html) |
| `-X` | [JSON](/dlang/compiler/json.html) |
{% endcomment %}


---
title: Delimiter
excerpt: It's time to use the standard delimiter
author: Ricardo Maicle
email: rmaicle@gmail.com
date: December 12, 2014
categories: [Blog]
tags: [delimiter, ascii, unicode]
---

Dump Comma-separated values (CSV) and Tab-delimited text. Although not commonly used, the [ASCII Delimited Text] was created for the specific purpose of delimiting ASCII text.

Unicode adopted the ASCII Text Delimiters.

| Unicode | ASCII | Seq  | ASCII Name            | Unicode Name                |
| --------|-------|------|-----------------------|-----------------------------|
| U+001F  | 31 1F | `^_` | Unit Separator (US)   | Information Separator One   |
| U+001E  | 30 1E | `^^` | Record Separator (RS) | Information Separator Two   |
| U+001D  | 29 1D | `^]` | Group Separator (GS)  | Information Separator Three |
| U+001C  | 28 1C | `^\` | File Separator (FS)   | Information Separator Four  |

Unicode added two new terminator or [separator characters] \*.

| Unicode         | ASCII | Seq   | ASCII Name           | Unicode Name        |
| ----------------|-------|-------|----------------------|---------------------|
| U+000A          | 10 0A | `^J`  | Line Feed (LF)       |                     |
| U+000B          | 11 0B | `^K`  | Vertical Tab (VT)    |                     |
| U+000C          | 12 0C | `^L`  | Form Feed (FF)       |                     |
| U+000D          | 13 0D | `^M`  | Carriage Return (CR) |                     |
| U+000D + U+000A |       |       | CR+LF                |                     |
| U+0085          |       | `\eE` |                      | Next Line (NEL)     |
| U+2028 \*       |       |       |                      | Line Separator      |
| U+2029 \*       |       |       |                      | Paragraph Separator |

Unicode also defines graphic pictures for control characters ([PDF]) from the area U+2400 to U+2421 for printing or displaying. The following table shows the equivalent printable characters of the above code points.

| Unicode | ASCII Name               | Symbol |
| --------|--------------------------|-----------------------------|
| U+241F  | Unit Separator (US)      | &#x241F;   |
| U+241E  | Record Separator (RS)    | &#x241E;   |
| U+241D  | Group Separator (GS)     | &#x241D; |
| U+241C  | File Separator (FS)      | &#x241C;  |
| U+2028  | Line Separator (LS)      |   |
| U+2029  | Paragraph Separator (PS) |   |



[separator characters]: https://en.wikipedia.org/wiki/Newline#Unicode
[ASCII Delimited Text]: http://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
[PDF]: http://www.unicode.org/charts/PDF/U2400.pdf
project(BZip2)
IF (NOT WIN32 AND UNIX)
	FILE(GLOB ALL_HEADER_SRCS *.h)
	FILE(GLOB ALL_C_SRCS *.c)
	include_directories(./) 
	add_library(LibBZip2 STATIC ${ALL_C_SRCS} ${ALL_HEADER_SRCS})
ENDIF(NOT WIN32 AND UNIX)

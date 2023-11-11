## rule:
1000 dataset

# Round 1 : Dictionary vs Array
Cbir + cache using array
Tue Nov  7 02:08:53 2023    my_func_stats

         65652 function calls (65642 primitive calls) in 0.316 seconds

Cbir + cache using dict
Tue Nov  7 03:28:53 2023    my_func_stats

         22648 function calls (21558 primitive calls) in 0.248 seconds

Cbir + no cache using array
Tue Nov  7 03:38:13 2023    my_func_stats

         1167449 function calls (1167439 primitive calls) in 33.556 seconds

Cbir + no cache using dict
Tue Nov  7 03:39:55 2023    my_func_stats

         2633592 function calls (2498582 primitive calls) in 24.876 seconds

Conclusion = Using dictionary is faster than using array


# Round 2 : Color Quantization optimization
Base color quantization
Tue Nov  7 03:43:45 2023    my_func_stats

         2633608 function calls (2498598 primitive calls) in 25.519 seconds
9009    2.417    0.000    6.308    0.001 D:\IF2121_TB_02\back-end\CBIR_REVISED.py:12(color_quantization)

Optimized color quantization

Tue Nov  7 03:42:30 2023    my_func_stats

         2759734 function calls (2624724 primitive calls) in 24.107 seconds

9009    2.196    0.000    7.252    0.001 D:\IF2121_TB_02\back-end\CBIR_REVISED.py:12(color_quantization)

conclusion = Failed to optimize color quantization

# Round 3 : Multiprocessing implementation in histogram array function (using 5 dataset)
Base histogram array function
Tue Nov  7 04:03:57 2023    my_func_stats

         1476423 function calls (1341413 primitive calls) in 0.823 seconds

Multiprocessing histogram array function
Tue Nov  7 04:03:20 2023    my_func_stats

         1548808 function calls (1413601 primitive calls) in 4.103 seconds
        
Conclusion = Failed to implement multiprocessing in histogram array function

# Round 4 : Parallelization
Base parallelization
Tue Nov  7 04:21:44 2023    my_func_stats

         1164592 function calls (1164582 primitive calls) in 23.800 seconds

Implement Parallelization
Tue Nov  7 04:19:26 2023    my_func_stats

         46196 function calls (45989 primitive calls) in 11.754 seconds

conclusion = Success to implement parallelization, with some error in cache

# Round 5 : Multiprocessing implementation in histogram array function (using 1000 dataset)
Base histogram array function
Tue Nov  7 10:45:12 2023    my_func_stats

         3287936 function calls (3019926 primitive calls) in 24.738 seconds

Multiprocessing histogram array function
Tue Nov  7 10:45:51 2023    my_func_stats

         3337929 function calls (2801722 primitive calls) in 13.703 seconds

conclusion = Success to implement multiprocessing in histogram array function

# Round 6 : PowerSaveMode & Process = 16
Base PowerSaveMode
Tue Nov  7 11:48:44 2023    my_func_stats

         79071 function calls (78864 primitive calls) in 14.603 seconds

Implement Process = 16
Tue Nov  7 11:50:01 2023    my_func_stats

         79042 function calls (78835 primitive calls) in 13.568 second

conclusion = Success to implement Process = 16

# Round 7 : PowerSaveMode & Process = 32
Base PowerSaveMode
Tue Nov  7 11:48:44 2023    my_func_stats

         79071 function calls (78864 primitive calls) in 14.603 seconds

Implement Process = 32
Tue Nov  7 11:52:04 2023    my_func_stats

         91126 function calls (90919 primitive calls) in 14.153 seconds

# Round 8 : PowerSaveMode & Process = 64
Crash

# Round 9 : PowerSaveMode & Process = 8
Tue Nov  7 11:54:38 2023    my_func_stats

         73430 function calls (73223 primitive calls) in 14.527 seconds

Conclusion = Success to implement PowerSaveMode & Process = 16

# Round 10 : Optimized json using ujson, json structure change 
+ cache
Tue Nov  7 13:48:03 2023    my_func_stats

         82140 function calls (81933 primitive calls) in 1.653 seconds\

# Final Optimization (dataset = 4737)
- Cache
Tue Nov  7 15:41:51 2023    my_func_stats

         319412 function calls (319205 primitive calls) in 54.169 seconds

+ Cache
Tue Nov  7 15:43:43 2023    my_func_stats

         314680 function calls (314473 primitive calls) in 3.553 seconds

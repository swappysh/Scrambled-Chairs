# coding: utf-8
get_ipython().run_line_magic('load', 'unluck_chairs.py')
# %load unluck_chairs.py
import copy
a = ['A', 'B', 'C', 'D' ,'_']

def rephrase(a):
    start = False
    new_a = []
    i = 0
    while len(new_a) != len(a):
        j = i % len(a)
        if not start:
            if a[j] == 'A':
                start = True
        if start:
            new_a.append(a[j])
        i += 1
    return new_a
    
def right_swap(state, k):
    new_state = copy.deepcopy(state)
    i = 0
    while True:
        if new_state[i] == '_':
            index = (i+k)%len(new_state)
            new_state[i] = new_state[index]
            new_state[index] = '_'
            break
        i += 1
    return new_state
    
def custom_add(arr, v, drop=False):
    new_v = copy.deepcopy(v)
    if drop:
        new_v.remove('_')
    arr.add(new_v)
    
def gen_all_right_swaps(a, k, drop=False):
    new_state = right_swap(a, k)
    sols = set()
    custom_add(sols, new_state, drop)
    while new_state != a:
        new_state = right_swap(new_state, k)
        custom_add(sols, new_state, drop)
    return sols
    
gen_all_right_swaps(a, 2, True)
a
right_swap(right_swap(a,2), 2)
b = (1,2)
c = b[1]+b[0]
c
c = b[1:]+b[0:1]
c
a = ('A', 'B', 'C', 'D' ,'_')
def rephrase(a):
    start = False
    new_a = ()
    i = 0
    while True:
        if a[i] == 'A':
            new_a = a[i:] + reversed(a[0:i])
            break
        i += 1
    return new_a
    
rephrase(a)
reversed(a)
tuple(reversed(a))
def rephrase(a):
    start = False
    new_a = ()
    i = 0
    while True:
        if a[i] == 'A':
            new_a = a[i:] + tuple(reversed(a[0:i]))
            break
        i += 1
    return new_a
    
rephrase(a)
a = ('B', 'A', 'C', 'D' ,'_')
rephrase(a)
def right_swap(state, k):
    new_state = ()
    i = 0
    while True:
        if state[i] == '_':
            index = (i+k)%len(state)
            if i > index:
                i += index
                index = i - index
                i = i - index
            new_state = state[:i] + state[index:index+1] + state[i+1:index] + state[i:i+1] + state[index+1:]
            break
        i += 1
    return new_state
    
right_swap(right_swap(a,2), 2)
right_swap(a, 2)
a
def modify_state(state, drop=False):
    new_state = ()
    if drop:
        i = 0
        while True:
            if state[i] == '_':
                new_state = state[:i] + state[i+1:]
                break
            i += 1
    return new_state
    
modify_state(a, True)
modify_state(right_swap(a,2), True)
def modify_state(state, drop=False):
    new_state = ()
    if drop:
        i = 0
        while True:
            if state[i] == '_':
                new_state = state[:i] + state[i+1:]
                break
            i += 1
    else:
        new_state = state
    return new_state
    
def gen_all_right_swaps(a, k, drop=False):
    new_state = right_swap(a, k)
    sols = set(rephrase(modify_state(new_state, drop)))
    while new_state != a:
        new_state = right_swap(new_state, k)
        sols.add(rephrase(modify_state(new_state, drop)))
    return sols
    
gen_all_right_swaps(a, 2, True)
gen_all_right_swaps(a, 2)
gen_all_right_swaps(a, 2, True)
gen_all_right_swaps(a, 2)
def gen_all_right_swaps(a, k, drop=False):
    new_state = right_swap(a, k)
    sols = set(rephrase(modify_state(new_state, drop)))
    while new_state != a:
        new_state = right_swap(new_state, k)
        if len(new_state) == 1:
            print("wow how")
        sols.add(rephrase(modify_state(new_state, drop)))
    return sols
    
gen_all_right_swaps(a, 2)
b = set()
b.add(a)
b
def gen_all_right_swaps(a, k, drop=False):
    new_state = right_swap(a, k)
    sols = set(rephrase(modify_state(new_state, drop)))
    while new_state != a:
        print("Added: ", new_state)
        new_state = right_swap(new_state, k)
        sols.add(rephrase(modify_state(new_state, drop)))
    return sols
    
gen_all_right_swaps(a, 2)
gen_all_right_swaps(a, 2, True)
def gen_all_right_swaps(a, k, drop=False):
    new_state = right_swap(a, k)
    sols = set(rephrase(modify_state(new_state, drop)))
    while new_state != a:
        print("Added: ", new_state)
        print("Set: ", sols)
        new_state = right_swap(new_state, k)
        sols.add(rephrase(modify_state(new_state, drop)))
    return sols
    
gen_all_right_swaps(a, 2, True)
def gen_all_right_swaps(a, k, drop=False):
    new_state = right_swap(a, k)
    sols = set(rephrase(modify_state(new_state, drop)))
    while new_state != a:
        print("Added: ", new_state)
        new_state = right_swap(new_state, k)
        sols.add(rephrase(modify_state(new_state, drop)))
        print("Set: ", sols)
    return sols
    
gen_all_right_swaps(a, 2, True)
def gen_all_right_swaps(a, k, drop=False):
    new_state = right_swap(a, k)
    sols = set(tuple(rephrase(modify_state(new_state, drop))))
    while new_state != a:
        print("Added: ", new_state)
        new_state = right_swap(new_state, k)
        sols.add(rephrase(modify_state(new_state, drop)))
        print("Set: ", sols)
    return sols
    
gen_all_right_swaps(a, 2, True)
def gen_all_right_swaps(a, k, drop=False):
    new_state = right_swap(a, k)
    sols = set()
    sols.add(rephrase(modify_state(new_state, drop)))
    while new_state != a:
        print("Added: ", new_state)
        new_state = right_swap(new_state, k)
        sols.add(rephrase(modify_state(new_state, drop)))
        print("Set: ", sols)
    return sols
    
gen_all_right_swaps(a, 2, True)
def gen_all_right_swaps(a, k, drop=False):
    new_state = right_swap(a, k)
    sols = set()
    while new_state != a:
        sols.add(rephrase(modify_state(new_state, drop)))
        new_state = right_swap(new_state, k)
    return sols
    
gen_all_right_swaps(a, 2, True)
gen_all_right_swaps(a, 2)
a
a = ('A', 'B', 'C', 'D' ,'_')
gen_all_right_swaps(a, 2)
gen_all_right_swaps(a, 2, True)
def gen_all_right_swaps(a, k, drop=False):
    new_state = right_swap(a, k)
    sols = set()
    while new_state != a:
        print(new_state, a)
        sols.add(rephrase(modify_state(new_state, drop)))
        new_state = right_swap(new_state, k)
    return sols
    
gen_all_right_swaps(a, 2, True)
def gen_all_right_swaps(a, k, drop=False):
    new_state = right_swap(a, k)
    sols = set()
    while new_state != a:
        print(new_state, a)
        sols.add(rephrase(modify_state(new_state, drop)))
        print(sols)
        new_state = right_swap(new_state, k)
    return sols
    
gen_all_right_swaps(a, 2, True)
rephrase(('_', 'D', 'C', 'A', 'B'))
def rephrase(a):
    start = False
    new_a = ()
    i = 0
    while True:
        if a[i] == 'A':
            new_a = a[i:] + a[:i]
            break
        i += 1
    return new_a
    
rephrase(('_', 'D', 'C', 'A', 'B'))
gen_all_right_swaps(a, 2, True)

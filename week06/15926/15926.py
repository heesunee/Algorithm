N = int(input())
string = input().strip()
stack = []
answers = [[-1, -2]]
for i in range(N) :
  if string[i] == '(' :
    stack.append(i)
  elif stack :
    tmp = [stack.pop(), i]
    while answers and answers[-1][0] > tmp[0] :
      answers.pop()
    if answers and answers[-1][1] + 1 == tmp[0] :
      tmp[0] = answers.pop()[0]
    answers.append(tmp)

answers.sort(key = lambda x : x[1] - x[0])
print(answers[-1][1]-answers[-1][0]+1)

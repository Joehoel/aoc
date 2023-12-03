from collections import defaultdict
data = open("2023/03/input.txt").read().split("\n")

y = 0
d = defaultdict(list)

for i in range(len(data)):
    for j in range(len(data[i])):
        if data[i][j].isdigit() and (j==0 or not data[i][j-1].isdigit()):
            t = min(k for k in range(j, len(data[i])+1) if not (data[i]+" ")[k].isdigit())
            s = False
            for u in range(max(i-1, 0), min(i+2, len(data))):
                for v in range(max(j-1, 0), min(t+1, len(data[j]))):
                    s = s or data[u][v] not in "0123456789."
                    if data[u][v] == "*":
                        d[(u,v)].append(int(data[i][j:t]))
            y += int(data[i][j:t]) if s else 0

print(y, sum(e[0]*e[1] for e in d.values() if len(e) == 2))
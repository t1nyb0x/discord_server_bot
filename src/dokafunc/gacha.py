import random

def dokamikuzi(self):
    res = ''
    val = random.randrange(10000)
    if val % 50 == 0:
        res = "大吉だぜ。今日は土方姿で盛り合おうぜ。"
    elif val % 50 == 1:
        res = "大アナルだぜ。今日はイチジク浣腸を3本ずつ入れ合うことになる。"
    elif val % 9 == 2:
        res = "中吉や。コンビニで酒とつまみを買おう。"
    elif val % 9 == 3:
        res = "中アナルや。糞遊びはほどほどにね"
    elif val % 9 == 4:
        res = "吉や。"
    elif val % 9 == 5:
        res = "吉アナルや。まぁ人並みでしょうね"
    elif val % 9 == 6:
        res = "末吉や。こんな日は糞遊びをしよう"
    elif val % 9 == 7:
        res = "凶や。たまにはこういう日もあるぜ"
    elif val % 9 == 8:
        res = "大凶アナルや。こんな日に糞遊びすると、痔になるかもしれない"
    else:
        res = "吉や。邪淫って知ってるかな？"
    return res
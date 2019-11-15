import numpy as np
def generatestring():
	
	l = 10
	ns=''
	
	for i in range(l):
		a = np.random.randint(97,122)
		ns+=chr(a)


	return ns


print(generatestring())

	
	

	

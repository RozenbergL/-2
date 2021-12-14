let fs = require('fs');
let arg = process.argv;
s = fs.readFileSync('string.txt');
s = s.toString();
console.log(s);
stack = new Array();
ind = -1;
answer = new Array();
prov = new Array();
prior = {'+' : 0, '-' : 0, '*' : 1, '/' : 1, '^' : 2};
for (i = 0; i <= 9; i++){
	prov.push(i);
}
i = 0;
while (i < s.length){
	if ((prov.includes(s[i] * 1) == true) || ((s[i] == '-') && (prov.includes(s[i - 1] * 1) == false) && (prov.includes(s[i + 1] * 1) == true))){
		x = '';
		j = i;
		while ((prov.includes(s[j] * 1)) || (s[j] == ".") || ((s[j] == '-') && (prov.includes(s[j - 1]) == false) && (prov.includes(s[i + 1] * 1) == true))){
			x = x + s[j];
			i = j;
			j++;
		}
		x = x * 1;
		answer.push(x);
		i++;
	}else{
		if ((s[i] == '+') || (s[i] == '-') || (s[i] == '*') || (s[i] == '/') || (s[i] == '^')){
			if (prior[stack[ind]] >= prior[s[i]]){
				answer.push(stack[ind]);
				stack2 = new Array();
				for (z = 0; z < ind; z++){
					stack2.push(stack[z]);
				}
				stack = stack2;
				stack.push(s[i]);
			}else{
				stack.push(s[i]);
				ind++;
			}
		}
		if (s[i] == '('){
			stack.push(s[i]);
			ind++;
		}
		if (s[i] == ')'){
			k = ind;
			k2 = k;
			while (stack[k] != '('){
				answer.push(stack[k]);
				k--;
			}
			stack2 = new Array();
			for (z = 0; z < k; z++){
				stack2.push(stack[z]);
			}
			stack = stack2;
			ind = k - 1;
		}
		i++;
	}
}
for (i = ind; i >= 0; i--){
	answer.push(stack[i]);
}
console.log(answer);
final_stack = new Array();
for (i = 0; i < answer.length; i++){
	if ((answer[i] != '+') && (answer[i] != '-') && (answer[i] != '*') && (answer[i] != '/') && (answer[i] != '^')){
		final_stack.push(answer[i]);
	}else{
		if (answer[i] == '+'){
			final_stack2 = new Array();
			final_stack.push(answer[i]);
			www = final_stack[final_stack.length - 3] + final_stack[final_stack.length - 2];
			for (j = 0; j < final_stack.length - 3; j++){
				final_stack2.push(final_stack[j]);
			}
			final_stack2.push(www);
			final_stack = final_stack2;
		}
		if (answer[i] == '-'){
			final_stack2 = new Array();
			final_stack.push(answer[i]);
			www = final_stack[final_stack.length - 3] - final_stack[final_stack.length - 2];
			for (j = 0; j < final_stack.length - 3; j++){
				final_stack2.push(final_stack[j]);
			}
			final_stack2.push(www);
			final_stack = final_stack2;
		}
		if (answer[i] == '*'){
			final_stack2 = new Array();
			final_stack.push(answer[i]);
			www = final_stack[final_stack.length - 2] * final_stack[final_stack.length - 3];
			for (j = 0; j < final_stack.length - 3; j++){
				final_stack2.push(final_stack[j]);
			}
			final_stack2.push(www);
			final_stack = final_stack2;
		}
		if (answer[i] == '/'){
			final_stack2 = new Array();
			final_stack.push(answer[i]);
			www = final_stack[final_stack.length - 3] / final_stack[final_stack.length - 2];
			for (j = 0; j < final_stack.length - 3; j++){
				final_stack2.push(final_stack[j]);
			}
			final_stack2.push(www);
			final_stack = final_stack2;
		}
		if (answer[i] == '^'){
			final_stack2 = new Array();
			final_stack.push(answer[i]);
			www = Math.pow(final_stack[final_stack.length - 3], final_stack[final_stack.length - 2]);
			for (j = 0; j < final_stack.length - 3; j++){
				final_stack2.push(final_stack[j]);
			}
			final_stack2.push(www);
			final_stack = final_stack2;
		}
	}
}
console.log(final_stack[0]);


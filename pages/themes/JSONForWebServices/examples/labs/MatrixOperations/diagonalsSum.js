
var matrix = {
	m: [
			[1,	2, 3, -5],
			[1,	9, 2, 4 ],
			[1,	0, 2, -4],
			[4,	0, 2, 4 ],
		],
	leftDiagSum: function(){
		// sum of left diagonal elements > 0
		console.log(``);
		// return sum;
	},
	rightDiagSum:function(){
		// sum of right diagonal elements > 0
		// return sum;
	},
	showMatrix:function(){
		var m = this.m;

		for (var i = 0; i < m.length; i++) {
			var row = `row ${i}:`;
			for (var j = 0; j < m[i].length; j++) {
				row += ` ${m[i][j]} `;
			}
			console.log(`${row}`);
		}
	}
};

matrix.showMatrix();
console.log( matrix.leftDiagSum() );
console.log( matrix.rightDiagSum() );
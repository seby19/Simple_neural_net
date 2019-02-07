class Matrix {
    constructor(rows , cols) {
        this.rows = rows;   
        this.cols = cols;
        this.data = [];

        this.data = Array(this.rows).fill().map(() => Array(this.cols).fill(0));

        // for(let i= 0 ; i < this.rows ; i++) {
        //     this.data[i] = [];
        //     for(let j = 0 ; j < this.cols ; j++) {
        //         this.data[i][j] = 0;
        //     }
        // }
    }

    randomInit() {
        for(let i= 0 ; i < this.rows ; i++) {
            for(let j = 0 ; j < this.cols ; j++) {
                this.data[i][j] = Math.random() * 2 - 1;
            }
        }
    }


    static transpose(mat) {
        let res = new Matrix(mat.cols , mat.rows);
        for(let i= 0 ; i < mat.rows ; i++) {
            for(let j = 0 ; j < mat.cols ; j++) {
                res.data[j][i] = mat.data[i][j];
            }

        }
        return res;
    }

    static multiply(m1 , m2) {
        if (m1.cols !== m2.rows) {
            console.log("Matrices should be eligible");
            return undefined;
        }
        let res = new Matrix(m1.rows , m2.cols);
        for(let i= 0 ; i < res.rows ; i++) {
            for(let j = 0 ; j < res.cols ; j++) {
                let sum = 0;
                for( let k = 0 ; k < m1.cols ; k++)
                {
                    sum += m1.data[i][k] * m2.data[k][j];
                }
                res.data[i][j] = sum;
            }

        }
        return res;

    }

    map(fn) {

        for(let i= 0 ; i < this.rows ; i++) {
            for(let j = 0 ; j < this.cols ; j++) {
                let val = this.data[i][j]
                this.data[i][j] = fn(val);
            }
        }

    }

    static map(mat , fn) {
        let result = new Matrix(mat.rows , mat.cols);
        for(let i= 0 ; i < mat.rows ; i++) {
            for(let j = 0 ; j < mat.cols ; j++) {
                let val = mat.data[i][j]
                result.data[i][j] = fn(val);
            }
        }
        return result;
    }

    multiply(num) {

        for(let i= 0 ; i < this.rows ; i++) {
            for(let j = 0 ; j < this.cols ; j++) {
                this.data[i][j] *= num;
            }
        }

    }



    add(num) {
        
        if(num instanceof Matrix) {

            if (this.rows !== num.rows || this.cols !== num.cols) {
                console.log("Matrices should be eligible");
                return undefined;
            }

            for(let i= 0 ; i < this.rows ; i++) {
                for(let j = 0 ; j < this.cols ; j++) {
                    this.data[i][j] += num.data[i][j];
                }
            }

        } else {

            for(let i= 0 ; i < this.rows ; i++) {
                for(let j = 0 ; j < this.cols ; j++) {
                    this.data[i][j] += num;
                }
            }
        }
    }

    printMatrix() {
        console.table(this.data);
    }

    static toMatrix(arr) {
        let m = new Matrix(arr.length , 1);
        for(let i = 0 ; i < arr.length ; i++)
        {
            m.data[i][0] = arr[i];
        }
        return m;
    }

    static toArray(mat) {
        let arr = []
        for(let i = 0 ; i < mat.rows ; i++) {
            arr.push(mat.data[i][0]);
        }
        return arr;
    }

    static subtract(targets, outputs) {
        let res = new Matrix(targets.rows, targets.cols)
        for(let i= 0 ; i < targets.rows ; i++) {
            for(let j = 0 ; j < targets.cols ; j++) {
                res.data[i][j] =  targets.data[i][j] - outputs.data[i][j];
            }
        }
        return res;
    }

    static dot(mat1 , mat2) {
        let res = new Matrix(mat1.rows, mat2.cols)
        for(let i= 0 ; i < mat1.rows ; i++) {
            for(let j = 0 ; j < mat1.cols ; j++) {
                res.data[i][j] =  mat1.data[i][j] * mat2.data[i][j];
            }
        }
        return res;
    }

    static weightsChange(layer , delta) {
        let res = new Matrix(delta.rows , layer.rows);
        // console.log("weight.rows" + weight.rows + ", " + weight.cols);
        // console.log("delta.rows" + delta.rows + ", " + delta.cols);
        for(let i = 0 ; i < res.rows ; i++) {
            for(let j = 0 ; j < res.cols ; j++) {
                // console.log("i,j" + i + "," + j);
                res.data[i][j] = layer.data[j][0] * delta.data[i][0];
            }
        }
        // res.printMatrix();
        return res;
    }
}
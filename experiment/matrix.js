function rad2deg(rad) {
  return rad * 180 / Math.PI
}

class Matrix {
  constructor(row, col, values) {
    this.row = row
    this.col = col

    const size = row * col
    this.values = new Array(size)
    for (let i = 0; i < size; i++) {
      this.values[i] = values[i] || 0
    }
  }

  add(otherMatrix) {
    if (otherMatrix.row != this.row || otherMatrix.col != this.col) {
      throw new Error('rows (or columns) are not equal')
    }
    const size = this.row * this.col
    const values = new Array(size)
    for (let i = 0; i < size; i++) {
      values[i] = this.values[i] + otherMatrix.values[i]
    }
    return new Matrix(this.row, this.col, values)
  }

  mul(otherMatrix) {
    if (this.row != otherMatrix.col) {
      throw new Error('the row of first matrix is not equal to the other')
    }
    
  }

  formatLog() {
    const arr = new Array(this.col)
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        arr[j] = this.values[i * this.row + j]
      }
      console.log(arr)
    }
  }
  // https://math.stackexchange.com/questions/13150/extracting-rotation-scale-values-from-2d-transformation-matrix
  getRotate() {
    if (this.row != 2 || this.col != 3) {
      throw new Error('only supported 3x2 matrix')
    }
    const a = this.values[0]
    const b = this.values[1]
    return Math.atan2(-b, a)
  }
}

// matrix add
const a = new Matrix(2, 2, [
  1, 2,
  3, 4,
])
const b = new Matrix(2, 2, [
  88, 3,
  2, 1
])
a.add(b).formatLog()

// cal rotate
const rotate = new Matrix(2, 3, [
  0.87967, 0.475585, -0.475585, 
  0.87967, -3.74121, -97.1122
]).getRotate()
console.log(rotate)
console.log(rad2deg(rotate))
type DoubleList = number[][]
type SaddlePoint = { row: number, column: number }
type SPReturn = SaddlePoint[]
let clone = (obj: any): any => JSON.parse(JSON.stringify(obj))

// It's called a "saddle point" because it is greater than
// or equal to every element in its row and less than or
// equal to every element in its column.
export function saddlePoints(input: DoubleList): SPReturn {
    let answers: SPReturn = [];

    input.forEach((row, rowI) => {
        //arranges the row
        let rowSorted = clone(row).sort()
        row.forEach((element, i) => {
            //get the greatest row element
            if (element === rowSorted[row.length - 1]) {
                //arranges the column of the element
                let column: number[] = [];
                input.forEach((rowAgain) => {
                    column.push(rowAgain[i])
                })
                let columnSorted = clone(column).sort()
                //if the smallest value in the column, push to answers
                if (element === columnSorted[0]) {
                    answers.push({row: rowI + 1, column: i + 1})
                }
            }
        })
    })
    return answers
}

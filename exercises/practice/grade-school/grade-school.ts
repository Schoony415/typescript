type rosterDictionary = { [grade: number]: string[] };

export class GradeSchool {
    private masterRoster: rosterDictionary = {}

    roster(): rosterDictionary {
        return JSON.parse(JSON.stringify(this.masterRoster))
    }

    add(student: string, grade: number): void {

        for (let rosterGrades in this.masterRoster) {
            this.masterRoster[rosterGrades] = this.masterRoster[rosterGrades].filter(currentStudent => currentStudent !== student)
        }

        if (!this.masterRoster[grade]) {
            this.masterRoster[grade] = []
        }

        this.masterRoster[grade].push(student)
        this.masterRoster[grade].sort((a, b) => a.localeCompare(b))
    }

    grade(grade: number): string[] {
        return JSON.parse(JSON.stringify(this.masterRoster[grade] || []))
    }
}


// if (this.masterRoster[grade].length === 0) {
//     this.masterRoster[grade].push(student)
// } else {
//     let index = -1
//     console.log(student)
//     this.masterRoster[grade].forEach((currentStudent, i) => {
//         let localCompare = currentStudent.localeCompare(student);
//         console.log(currentStudent, localCompare)
//         if (localCompare > index) {
//             index = i
//         }
//
//     })
//
//     let front: string[] = this.masterRoster[grade].slice(0, index)
//     let back: string[] = [];
//
//     if (this.masterRoster[grade].length - 1 <= index) {
//         back = this.masterRoster[grade].slice(index + 1)
//     }
//
//     this.masterRoster[grade] = [
//         ...front,
//         student,
//         ...back]
// }

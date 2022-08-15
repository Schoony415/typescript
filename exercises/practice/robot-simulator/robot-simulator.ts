export class InvalidInputError extends Error {
    constructor(message: string) {
        super()
        this.message = message || 'Invalid Input'
    }
}

type Direction = 'north' | 'east' | 'south' | 'west'
type Coordinates = [number, number]

type Pose = { direction: Direction, posistion: Coordinates }
type Velocity = { direction: Direction, distance: Coordinates }

class DirectionObj {
    velocity: Velocity;
    Left: DirectionObj;
    Right: DirectionObj;

    constructor(velocity : Velocity) {
        this.velocity = velocity
        this.Left = undefined
        this.Right = undefined
    }

    link(l: DirectionObj, r: DirectionObj) {
        this.Left = l;
        this.Right = r;
    }

    A(pose: Pose): void {
        pose.posistion[0] += this.velocity.distance[0]
        pose.posistion[1] += this.velocity.distance[1]
    }

    L(pose: Pose): void {
        pose.direction = this.Left.velocity.direction
    }

    R(pose: Pose): void {
        pose.direction = this.Right.velocity.direction
    }
}

export class Robot {
    north: DirectionObj = new DirectionObj({direction: 'north', distance: [0, 1]})
    east: DirectionObj = new DirectionObj({direction: 'east', distance: [1, 0]})
    south: DirectionObj = new DirectionObj({direction: 'south', distance: [0, -1]})
    west: DirectionObj = new DirectionObj({direction: 'west', distance: [-1, 0]})

    private pose: Pose;

    constructor() {
        this.north.link(this.west, this.east);
        this.east.link(this.north, this.south);
        this.south.link(this.east, this.west);
        this.west.link(this.south, this.north);

        this.pose = {direction: this.north.velocity.direction, posistion: [0, 0]}
    }

    get bearing(): Direction {
        return this.pose.direction;
    }

    get coordinates(): Coordinates {
        return this.pose.posistion;
    }

    forceDirection(direction: string): void {
        if (!['north', 'east', 'south', 'west'].includes(direction)) {
            throw new InvalidInputError('wrong direction type')
        }
        this.pose.direction = direction as Direction
    }

    place({x, y, direction}: { x: number; y: number; direction: string }): void {
        this.forceDirection(direction)
        this.pose.posistion = [x, y]
    }

    evaluate(rawInstructions: string): void {
        let instructions = rawInstructions.split('') as ('R' | 'L' | 'A')[]
        instructions.forEach(instruction => this[this.pose.direction][instruction](this.pose))
    }
}

//
// type Coords = { x: number, y: number };
// type Actions = 'R' | 'L' | 'A'
// const DirectionList: string[] = ['north', 'east', 'south', 'west']
// export class Robot_1 {
//     private D: Direction = 'north'
//     private P: Coords = {x: 0, y: 0}
//
//     get bearing(): Direction {
//         return this.D
//     }
//
//     get coordinates(): Coordinates {
//         return [this.P.x, this.P.y]
//     }
//
//     place({x, y, direction}: { x: number; y: number; direction: string }): void {
//         if (!DirectionList.includes(direction)) {
//             throw new InvalidInputError('wrong direction type')
//         }
//         this.D = direction as Direction
//         this.P = {x, y};
//     }
//
//     evaluate(instructions: string): void {
//         let inst = instructions.split('')
//         inst.forEach(i => this.evaluate_inny(i as Actions))
//     }
//
//     evaluate_inny(instructions: Actions): void {
//         switch (instructions) {
//             case "R":
//                 this.D = DirectionList[DirectionList.indexOf(this.D) + 1 !== 4 ? DirectionList.indexOf(this.D) + 1 : 0] as Direction
//                 break;
//             case "L":
//                 this.D = DirectionList[DirectionList.indexOf(this.D) - 1 !== -1 ? DirectionList.indexOf(this.D) - 1 : 3] as Direction
//                 break;
//             case "A":
//                 switch (this.D) {
//                     case "north":
//                         this.P.y++;
//                         break;
//                     case "east":
//                         this.P.x++;
//                         break;
//                     case "south":
//                         this.P.y--;
//                         break;
//                     case "west":
//                         this.P.x--;
//                         break;
//                 }
//                 break;
//         }
//     }
// }

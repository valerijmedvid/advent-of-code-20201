fs = require("fs")
let input = ""
try {
  input = fs.readFileSync("./input_data.txt", "utf8")
} catch (err) {
  console.error(err)
}

let coordinates = input
  .split("\n")
  .map((x) => {
    let coo = x.split(" -> ")
    start_coordinates = coo[0].split(",").map((x) => parseInt(x))
    end_coordinates = coo[1].split(",").map((x) => parseInt(x))
    return start_coordinates.concat(end_coordinates)
  })
  .filter((coo) => {
    let [x1, y1, x2, y2] = coo
    return x1 == x2 || y1 == y2
  })

let maxX = 0
let maxY = 0
coordinates.forEach((coor) => {
  let [x1, y1, x2, y2] = coor
  if (x1 > maxX) {
    maxX = x1
  }
  if (x2 > maxX) {
    maxX = x2
  }
  if (y1 > maxY) {
    maxY = y1
  }
  if (y2 > maxY) {
    maxY = y2
  }
})
let field = []

for (let x = 0; x <= maxY; x++) {
  field.push([])
  for (let y = 0; y <= maxX; y++) {
    field[x].push(0)
  }
}

coordinates.forEach((coor) => {
  let [x1, y1, x2, y2] = coor
  if (x1 == x2) {
    start = y1 < y2 ? y1 : y2
    end = y1 < y2 ? y2 : y1
    for (let i = start; i <= end; i++) {
      field[i][x1] += 1
    }
  }
  if (y1 == y2) {
    start = x1 < x2 ? x1 : x2
    end = x1 < x2 ? x2 : x1
    for (let i = start; i <= end; i++) {
      field[y1][i] += 1
    }
  }
})

// field.forEach((line) => {
//   line.forEach((char) => {
//     process.stdout.write(`${char.toString().replace("0", "•")} `)
//   })
//   console.log("")
// })

let result = 0

field.forEach((line) => {
  line.forEach((char) => {
    if (char > 1) {
      result += 1
    }
  })
})

console.log(result)

const diffObject = (oldObject, newObject, filterKey) => {
  const oldKey = Object.keys(oldObject)
  const newKey = Object.keys(newObject)


   const mergeKey = filterKey.reduce((set, current) => {
    if (set.has(current)) {
      set.delete(current)
    }

    return set
  }, new Set([...newKey, ...oldKey]))

  const keys = Array.from(mergeKey)
  const result = {}

  const n1 = {}
  const n2 = {}
  let type = ''

  for (let i = 0; i < keys.length; i++) {
    const current = keys[i]

    if (newObject[current] === oldObject[current]) {
      type = 'equal'
      n1[current] = type
      n2[current] = type
    } else if (
      newObject[current] !== undefined &&
      oldObject[current] !== undefined &&
      newObject[current] !== oldObject[current]
    ) {
      type = 'edit'
      n1[current] = type
      n2[current] = type
    } else if (newObject[current]) {
      type = 'add'
      n2[current] = type
    } else if (oldObject[current]) {
      type = 'delete'
      n1[current] = type
    }

    result[current] = type
  }

  return {
    old: {
      source: oldObject,
      result: n1
    },
    new: {
      source: newObject,
      result: n2
    }
  }
}

function diffArray (oldData, newData, filterKey, diff) {
  const result = {
    equal: [],
    add: [],
    edit: [],
    delete: [],
    unknown: []
  }

  let n1 = 0
  let n2 = 0

  while (n1 < oldData.length || n2 < newData.length) {
    if (oldData[n1] && newData[n2]) {
      const data = diffObject(oldData[n1], newData[n2], filterKey)
      const diffResult = diff?.(oldData[n1], newData[n2])
      const newObjectResult = Object.keys(data.new.result)

      for (let i = 0; i < newObjectResult.length; i++) {
        const current = newObjectResult[i]

        if (['add', 'edit', 'delete'].includes(data.new.result[current])) {
          result[data.new.result[current]].push(data.new.source)
        }
      }

      if (diffResult) {
        result[diffResult].push(newData[n2])
      }
      n1++
      n2++
    } else if (oldData[n1]) {
      result.delete.push(oldData[n1])
      n1++
    } else if (newData[n2]) {
      result.add.push(newData[n2])
      n2++
    }
  }

  return result
}

function arrayDiff (oldData, newData, filter = [], diff) {
  const result = {
    equal: [],
    add: [],
    edit: [],
    delete: [],
    unknown: []
  }

  let n1 = 0
  let n2 = 0

  while (n1 < oldData.length || n2 < newData.length) {
    if (oldData[n1] && newData[n2]) {
      const data = diffObject(oldData[n1], newData[n2], filter)
      const diffResult = diff?.(data)
      const newObjectResult = Object.keys(data.new.result)

      if (diffResult) {
        diffResult.reduce((obj, current) => {
          obj[current.type].push(current.data.source)

          return obj
        }, result)
      } else {
        for (let i = 0; i < newObjectResult.length; i++) {
          const current = newObjectResult[i]

          if (['add', 'edit'].includes(data.old.result[current])) {
            result[data.old.result[current]].push(data.old.source)
            break
          }
          if (['delete'].includes(data.old.result[current])) {
            result[data.old.result[current]].push(data.old.source)
            break
          }
        }
      }
      n1++
      n2++
    } else if (oldData[n1]) {
      result.delete.push(oldData[n1])
      n1++
    } else if (newData[n2]) {
      result.add.push(newData[n2])
      n2++
    }
  }

  return result
}

const oldData = [
  {
    id: 4,
    cover: null,
    name: "御坂美琴",
    addTime: {
    },
    bangumiId: 1,
    castId: 1,
  },
]

const newData = [
  {
    name: "23",
    bangumiId: 1,
    castId: 2,
  },
]
arrayDiff(oldData, newData, ['addTime'], (data) => {
  const newObject = data.new
  const oldObject = data.old

  const result = []

  if (oldObject.result?.id === 'delete') {
    result.push({
      type: 'delete',
      data: oldObject
    })
  } 
  if (
    oldObject.source.bangumiId === newObject.source.bangumiId &&
    oldObject.source?.id === newObject.source?.id
  )  {
    result.push({
      type: 'edit',
      data: newObject
    })
  } else {
    result.push({
      type: 'add',
      data: newObject
    })
  }

  return result
})

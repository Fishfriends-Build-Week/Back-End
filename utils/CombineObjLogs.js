module.exports = arr => {
  //establish new array
  let newArr = [];
  //loop through logs that are passed into this function
  arr.forEach(item => {
    //finds other logs with same id and puts them all into a single array called "existing"
    let existing = newArr.filter((v, i) => {
      return v.log_id == item.log_id;
    });
    //checks to see if existing has any elements inside it
    if (existing.length) {
      //if there are already elements then it establishes an "existingIndex" based on the index of the current item in relation to the original array --I think...
      var existingIndex = newArr.indexOf(existing[0]);
      //establishes a new element in the newArr called baitlist and puts an object inside it with info passed in through the "item" from the current loop
      newArr[existingIndex].bait_list = newArr[existingIndex].bait_list.concat({
        bait_id: item.bait_id,
        bait_name: item.bait_name
      });

      newArr[existingIndex].fish_list = newArr[existingIndex].fish_list.concat({
        fish_id: item.fish_id,
        fish_name: item.fish_name
      });
    } else {
      //if there were no elements in the "existing" filter, then it checks to see if the bait_list var is undefined
      if (item.bait_list == undefined || item.fish_list)
        //if so, the var "bait_list" is defined with the same elements as before, but it is initialized here in an array
        item.bait_list = [{ bait_id: item.bait_id, bait_name: item.bait_name }];
      item.fish_list = [{ fish_id: item.fish_id, fish_name: item.fish_name }];
      //now the item from this loop is pushed to our "newArr"
      newArr.push(item);
    }
  });
  //next is some cleanup to remove redundant information in each object before returning our newArr
  newArr.forEach(item => {
    delete item.bait_id;
    delete item.bait_name;
    delete item.bait_list;
    delete item.fish_list;
    // delete item.fish_id;
    // delete item.fish_name;
  });

  // console.log(newArr);

  return newArr;
};

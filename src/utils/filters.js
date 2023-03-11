export const filterData = (data, filterText, filterDate) =>
  data?.filter(
    (item) =>
      item.expenseItem.toLowerCase().includes(filterText.toLowerCase()) &&
      (filterDate.from ? new Date(item.date) >= filterDate.from : true) &&
      (filterDate.to ? new Date(item.date) <= filterDate.to : true)
  );

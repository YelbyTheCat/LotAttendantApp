import axios from 'axios';

export const getExternalInventory = async search => {
  // console.log(`Search: ${search} | ${new URLSearchParams(search).toString()}`);
  const searchQuery = new URLSearchParams(search).toString();
  console.log(`Search: ${searchQuery}`);

  const {data} = await axios.get(`https://www.cioccanissan.com/apis/widget/INVENTORY_LISTING_DEFAULT_AUTO_ALL:inventory-data-bus1/getInventory?${search ? '&'+searchQuery : ''}`);
  const {pageInfo} = data;

  const {totalCount, pageSize} = pageInfo;

  if (pageSize === 1 || totalCount < pageSize) return pageInfo.trackingData;
  let inventory = pageInfo.trackingData;
  let pageStart = pageSize;
  const pageCount = Math.ceil(totalCount / pageSize);

  for (let i = 1; i < pageCount; i++) {
    console.log(`${pageCount} ${pageStart} ${inventory.length}`);
    if (i === totalCount) break;
    const res = await axios.get(`https://www.cioccanissan.com/apis/widget/INVENTORY_LISTING_DEFAULT_AUTO_ALL:inventory-data-bus1/getInventory?&${searchQuery}&start=${pageStart}`);
    const {trackingData} = res.data.pageInfo;
    console.log('Tracking Data ', trackingData);
    inventory = [...inventory, ...trackingData];
    pageStart += pageSize;
  }

  const uniqueInventory = Array.from(new Map(inventory.map(item => [item.vin, item])).values());

  return uniqueInventory;
};

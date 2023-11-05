import "../public/app.scss";
import { ethers } from "ethers";

const getDataInRange = async (fromDate, toDate) => {
  const provider = new ethers.getDefaultProvider("https://api.calibration.node.glif.io/rpc/v1");
  const contractInstance = new ethers.Contract("0xd0ee658f1203302e35B9B9E3A73CB3472A2C2373", abi, provider);
  const allPubs = await contractInstance.pubsOfOwner("0x64251043A35ab5D11f04111B8BdF7C03BE9cF0e7");
  const filtered = allPubs.filter((pub) => {
    const isInNamespace = pub.includes("wxm2");
    if (!isInNamespace) {
      return false;
    }

    // The publication name format is wxm2.date_2023_10_15 and we want only the date part
    const pubDate = pub.substring(10);
    const pubTs = Math.round(parse(pubDate, "yyyy_MM_dd", new Date()).getTime() / 1000);

    return pubTs >= fromDate && pubTs <= toDate;
  });

  const cids = await Promise.all(
    filtered.map(async (pub) => {
      const deals = await contractInstance.latestNDeals(pub, 1);

      return deals[0][2];
    })
  );

  return cids;
};
const getData = (e) => {
  console.log(Math.floor(Date.now() / 1000));
  getDataInRange("", "");
};
const obtn = document.getElementById("oracle_btn");
obtn.addEventListener("click", getData);

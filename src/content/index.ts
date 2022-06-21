import axios from "axios";

export class TxNonceInject {
	public browser: any;

	constructor() {
		this.init();
	}
	private async init() {
		this.browser = chrome;

		window.addEventListener("load", () => {
			let timer = setTimeout(() => {
				this.changeDom(window.location.href);
				clearTimeout(timer);
			}, 1000);
		});
	}

	changeDom(url: string) {
		const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));
		const header = document.querySelector("thead > tr");
		header!.innerHTML =
			'<th scope="col" width="20">Index</th>' + header!.innerHTML;
		const res = document.querySelectorAll("tbody > tr");
		let i = 0;
		res.forEach(async (el) => {
			i++;
			console.log(i);
			if (i % 10 == 0) await delay(200);
			const txHash = el.querySelector(
				"a.myFnExpandBox_searchVal"
			)?.textContent;
			let req;
			if (url.includes("polygonscan.com/txs?block=")) {
				req = "polygonscan.com";
			} else if (url.includes("etherscan.io/txs?block=")) {
				req = "etherscan.io";
			} else if (url.includes("bscscan.com/txs?block=")) {
				req = "bscscan.com";
			}
			el.innerHTML =
						`<td id="nonce"></td>` + el.innerHTML;
			axios
				.get(
					`https://${req}/txsHandler.ashx?strSearchVal=${txHash}&toggleAction=popover&actionParam=txs`
				)
				.then(function (response: any) {
					// handle success
					var tempDiv = document.createElement("span");
					tempDiv.innerHTML = response.data;
					const txNonce = tempDiv.querySelector(
						"span[title='Index position of Transaction in the block']"
					)?.textContent;
					el.querySelector("#nonce")!.innerHTML =
						txNonce!.match(/\d+/g)![0];
				})
				.catch(function (error: any) {
					console.log(error);
				});
		});
	}
}

new TxNonceInject();

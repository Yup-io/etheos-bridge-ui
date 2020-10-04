const neatURL = require("./index")

describe('neatURL', () => {  

	it("Remove utm_source from querystring", () => {
		expect(neatURL({
			url: "https://www.example.com/bens-tagging?utm_source=mysite.com&utm_medium=referral&utm_campaign=url+tracking+post#Echobox=1568564590",
			includeHash: true
		})).toBe("https://www.example.com/bens-tagging");
	});

	it("Remove Echobox hash variable", () => {
		expect(neatURL({
			url: "https://nationalpost.com/news/world/in-edward-snowdens-new-memoir-the-disclosures-this-time-are-personal#Echobox=1568564590",
			includeHash: true
		})).toBe("https://nationalpost.com/news/world/in-edward-snowdens-new-memoir-the-disclosures-this-time-are-personal");
	});

	it("Ignore hash key with no value", () => {
		expect(neatURL({
			url: "https://nationalpost.com/news/world/in-edward-snowdens-new-memoir-the-disclosures-this-time-are-personal#abcdefg",
			includeHash: true
		})).toBe("https://nationalpost.com/news/world/in-edward-snowdens-new-memoir-the-disclosures-this-time-are-personal#abcdefg");
	});

	it("Remove s query from twitter links", () => {
		expect(neatURL({
			url: "https://twitter.com/SpongeBob/status/1167430538388488192?s=21"
		})).toBe("https://twitter.com/SpongeBob/status/1167430538388488192");
	});

	it("Remove emc and partner from nytimes links", () => {
		expect(neatURL({
			url: "https://www.nytimes.com/2019/09/15/health/vaping-thc-wisconsin.html?emc=rss&partner=rss"
		})).toBe("https://www.nytimes.com/2019/09/15/health/vaping-thc-wisconsin.html");
	});

	it("Remove ref_src and ref_url from twitter.com", () => {
		expect(neatURL({
			url: "https://twitter.com/abc/status/123?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E123456&ref_url=https%3A%2F%2Fwww.example.com"
		})).toBe("https://twitter.com/abc/status/123");
	});

	it("Remove amp from query", () => {
		expect(neatURL({
			url: "https://www.example.com/news/123/abc?amp=&__twitter_impression=true"
		})).toBe("https://www.example.com/news/123/abc");
	});
	
	it("Remove Amazon params", () => {
		expect(neatURL({
			url: "https://www.amazon.com/gp/product/123/ref=123?ie=UTF8&creative=123&linkCode=as2&creativeASIN=123&linkId=123"
		})).toBe("https://www.amazon.com/gp/product/123");
	});

	it("Normalize youtube url", () => {
		expect(neatURL({
			url: "https://www.youtube.com/watch?v=xxx&feature=push-prem-sub&attr_tag=xxx&ab_channel=xxx"
		})).toBe("https://www.youtube.com/watch?v=xxx");
	});

	it("Remove Webtrends campaign parameters", () => {
		expect(neatURL({
			url: "http://www.domain.com/landing.aspx?country=US&WT.mc_id=EmailCampaign1&WT.mc_ev=click&WT.srch=1"
		})).toBe("http://www.domain.com/landing.aspx?country=US");
	});

});


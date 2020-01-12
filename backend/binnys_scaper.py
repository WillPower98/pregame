from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq


my_url = 'https://www.binnys.com/spirits'
uClient = uReq(my_url)
page_html = uClient.read()
page_soup = soup(page_html,"html.parser")
uClient.close()


containers = page_soup.findAll("div",{"class":"product details product-item-details text-align-center"})

file = open("data.txt","w")
for container in containers:
    name = container.div.strong.a.text.strip()
    try:
        price = container.find("span",{"class":"old-price"})
        price = price.span.find("span",{"class":"price"})
    except:
        price = container.span.find("span",{"class":"price"})
    
    try:
        price = price.span.text.strip()
    except:
        price = price.text.strip()
    file.write(name+" "+price+"\n")

file.close()
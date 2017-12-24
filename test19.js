var arrayList = [{ text: 'One' }, { text: 'Two' }];
d3.select("body")
    .selectAll("p")
    .data(arrayList)
    .enter().append("p")
    .text(function(data) { return "I’m number " + data.text + "!"; });
d3.select("body").transition().duration(2000).style("background-color", "black");
d3.selectAll("p").transition().duration(2000).style("background-color", "white");
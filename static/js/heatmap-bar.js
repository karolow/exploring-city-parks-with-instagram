
function heatMapChart(dataSet, container, v1, v2, separator = 0, heatmapOnly = false){

separator = parseInt(separator);
var that = this;
var max_value = 0;

this.HM_data = d3.csvParse(dataSet,function(d,i,j){
  for (i = 2, t = 0; i < j.length; ++i) {
    if (d[j[i]] == "NA"){
      d[j[i]] = 0;
    }
    d[j[i]] = +d[j[i]];
  }
  if (d3.max(d3.values(d).slice(2,-1))/d.total > max_value){
    max_value = d3.max(d3.values(d).slice(2,-1))/d.total;
  }
  return d;
});

var bars_no = this.HM_data.columns.length - 3;

this.heatmap = d3.select(container + ' .heatmap-holder')
  .append("div")
    .attr('class','heatmap');

this.label_row = this.heatmap
                .append("div")
                .data(this.HM_data)
                  .attr("class","labelrow");


this.rows = this.heatmap.selectAll("div:not(.labelrow)")
            .data(this.HM_data)
          .enter().append("div")
            .attr('class','row unactive')
            .html(function(d){return "<span class='desktop'>" + d.label + "</span><span class='mobile'>" + d.labelshort + "</span>";});

this.hm_labels = this.label_row.selectAll('p')
            .data(function(d){return d3.keys(d).slice(2,-1);})
          .enter().append("p")
            .attr('data',function(d){return d})
            .text(function(d){return d})
            .style("width","calc("+100/bars_no+"% - 1px)")
            .style("margin-bottom","calc("+100/bars_no/2+"%)");

var height_coef = 100;
if ($(window).width() > 1920){
  height_coef = 150;
}

/*
var v1 = "";
var v2 = "";
if (curLan == "pl"){
  var v1 = " z ";
  var v2 = " badanych ";
}
else{
  var v1 = " of ";
  var v2 = " respondents";
}*/


this.rowbars = this.rows.selectAll('div')
            .data(function(d){return d3.entries(d).slice(2,-1);})
          .enter().append("div")
            .attr("class","rowbar")
            .style("width","calc("+100/bars_no+"% - 1px)")
            .style("height",function(d){return (d.value/d3.select(this.parentNode).datum().total)*height_coef + "px"})
            .style("opacity",function(d){return (d.value/d3.select(this.parentNode).datum().total)/max_value })
            .html(function(d,i){
              if(i < Math.floor(bars_no/2)-1){
                return "<p>"+ d3.format(".1f")((d.value/d3.select(this.parentNode).datum().total)*100)+"<span>%</span></p><div class='hm tooltip tooltip-left'><div class='tip-percent'><div>"+ d3.format(".3p")(d.value/d3.select(this.parentNode).datum().total) +"</div><div>" + d.key + "</div></div><div class='tip-numbers'>"+d.value+v1+d3.select(this.parentNode).datum().total+v2+"</div></div>";
              }
              else{
                return "<p>"+d3.format(".1f")((d.value/d3.select(this.parentNode).datum().total)*100)+"<span>%</span></p><div class='hm tooltip'><div class='tip-percent'><div>"+ d3.format(".3p")(d.value/d3.select(this.parentNode).datum().total) +"</div><div>" + d.key + "</div></div><div class='tip-numbers'>"+d.value+v1+d3.select(this.parentNode).datum().total+v2+"</div></div>";
              }
            });

  this.sort = function(label, order){
    if (order == 'asc'){
      this.rows.sort(function(a,b){return a[label]/a["total"] - b[label]/b["total"]});
    }
    else{
      this.rows.sort(function(a,b){return b[label]/b["total"] - a[label]/a["total"]});
    }
  }

  $(container + ' .heatmap .labelrow p').click(function(){
    if ($(this).attr('data') == "asc"){
      that.sort($(this).text(),"asc");
      $(this).attr('data',"desc");
    }
    else{
      that.sort($(this).text(),"desc");
      $(this).attr('data',"asc");
    }
  });

  if (separator > 0){
    $(container + ' .heatmap .labelrow').addClass('no-sort');
    $(container + ' .heatmap .row:nth-of-type('+(separator+1)+')').after('<div class="separator"></div>');
  }

  $(container + ' .heatmap .row').hover(function(){
    $(container + ' .heatmap .row').addClass("disting");
  },
  function(){
    $(container + ' .heatmap .row').removeClass("disting");
  });

  $(container + ' .heatmap .labelrow p').hover(function(){
    $(container + ' .heatmap .labelrow p').addClass('disting');
    $(this).removeClass('disting');
  },
  function(){
    $(container + ' .heatmap .labelrow p').removeClass('disting');
  });

  $(container + ' .heatmap .row .rowbar').hover(function(){
    $(container + ' .heatmap .labelrow p').addClass('disting');
    $(container + ' .heatmap .labelrow p[data="'+this.__data__.key+'"]').removeClass('disting');
  },
  function(){
    $(container + ' .heatmap .labelrow p').removeClass('disting');
  });

  if (!heatmapOnly) {
    $(container + ' .heatmap .row').click(function(){
      $(this).toggleClass("unactive");
      $(this).toggleClass("active");
    });
  }

  this.setWidth = function(width){
    if ($(window).width() > 767){
      width = width*0.666666;
    }
    $(container + ' .heatmap').css('width',width + '%');
  }

  this.highlight = function(state){
    $(container + ' .heatmap .row').each(function(){
      if($(this).children('span.desktop').text() == state){
        $(this).removeClass('unactive');
        $(this).addClass('active');
      }
    });
  }
  this.desactivate = function(state){
    $(container + ' .heatmap .row').each(function(){
      if($(this).children('span.desktop').text() == state){
        $(this).removeClass('active');
        $(this).addClass('unactive');
      }
    });
  }
}

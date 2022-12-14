const body = document.querySelector('body'),
      html = document.querySelector('html'),
      head = document.querySelector('head'),
      menu = document.querySelectorAll('.header__nav, body'),
      burger = document.querySelector('._burger'),
      header = document.querySelector('.header');
		

/* function copyToClipboard(el) {

  // resolve the element
  el = (typeof el === 'string') ? document.querySelector(el) : el;

  // handle iOS as a special case
  if (true) {
    console.log('test');
    // save current contentEditable/readOnly status
    var editable = el.contentEditable;
    var readOnly = el.readOnly;

    // convert to editable with readonly to stop iOS keyboard opening
    el.contentEditable = true;
    el.readOnly = true;

    // create a selectable range
    var range = document.createRange();
    range.selectNodeContents(el);

    // select the range
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    el.setSelectionRange(0, 999999);

    // restore contentEditable/readOnly to original state
    el.contentEditable = editable;
    el.readOnly = readOnly;
  }
  else {
    navigator.clipboard.writeText(el.value)
      .then(() => {

      })
      .catch(err => {
        console.log('Something went wrong', err);
      });
    console.log(el);
    el.select();
  }

  // execute copy command
  document.execCommand('copy');
} */

new ClipboardJS('._copy-btn');

let slideUp = (target, duration=500) => {
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout( () => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
}

let slideDown = (target, duration=500) => {
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;

  if (display === 'none')
    display = 'block';

  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = 'border-box';
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout( () => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
}

(function () {
  var FX = {
      easing: {
          linear: function (progress) {
              return progress;
          },
          quadratic: function (progress) {
              return Math.pow(progress, 2);
          },
          swing: function (progress) {
              return 0.5 - Math.cos(progress * Math.PI) / 2;
          },
          circ: function (progress) {
              return 1 - Math.sin(Math.acos(progress));
          },
          back: function (progress, x) {
              return Math.pow(progress, 2) * ((x + 1) * progress - x);
          },
          bounce: function (progress) {
              for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                  if (progress >= (7 - 4 * a) / 11) {
                      return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                  }
              }
          },
          elastic: function (progress, x) {
              return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
          }
      },
      animate: function (options) {
          var start = new Date;
          var id = setInterval(function () {
              var timePassed = new Date - start;
              var progress = timePassed / options.duration;
              if (progress > 1) {
                  progress = 1;
              }
              options.progress = progress;
              var delta = options.delta(progress);
              options.step(delta);
              if (progress == 1) {
                  clearInterval(id);
  
                  options.complete();
              }
          }, options.delay || 10);
      },
      fadeOut: function (element, options) {
          var to = 1;
          this.animate({
              duration: options.duration,
              delta: function (progress) {
                  progress = this.progress;
                  return FX.easing.swing(progress);
              },
              complete: options.complete,
              step: function (delta) {
                  element.style.opacity = to - delta;
              }
          });
      },
      fadeIn: function (element, options) {
          var to = 0;
          element.style.display = 'block';
          this.animate({
              duration: options.duration,
              delta: function (progress) {
                  progress = this.progress;
                  return FX.easing.swing(progress);
              },
              complete: options.complete,
              step: function (delta) {
                  element.style.opacity = to + delta;
              }
          });
      }
  };
  window.FX = FX;
})()
  
// =-=-=-=-=-=-=-=-=-=-=-=- <popup> -=-=-=-=-=-=-=-=-=-=-=-=

let popupCheck = true, popupCheckClose = true;
function popup(arg) {

if (popupCheck) {
    popupCheck = false;

    let popup, popupClose,

        duration = (arg.duration) ? arg.duration : 200,
        id = arg.id;

        if(document.querySelector(id)) {
          popup = document.querySelector(id);
          popupClose = popup.querySelectorAll('._popup-close');
        } else {
          return false;
        }
        

    function removeFunc(popup, removeClass) {

        if (popupCheckClose) {
            popupCheckClose = false;

            FX.fadeOut(popup, {
                duration: duration,
                complete: function () {
                    popup.style.display = 'none';
                }
            });
            popup.classList.remove('_active');

            setTimeout(() => {
                popupCheckClose = true;
            }, duration)

            if (removeClass) {
                if (header) header.classList.remove('_popup-active');

                setTimeout(function () {

                    body.classList.remove('_popup-active');
                    html.style.setProperty('--popup-padding', '0px');

                }, duration)
            }
        }
    }

    body.classList.remove('_popup-active');
    html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
    body.classList.add('_popup-active');

    popup.classList.add('_active');
    if (header) header.classList.add('_popup-active');

    setTimeout(function () {
        FX.fadeIn(popup, {
            duration: duration,
            complete: function () {
            }
        });
    }, duration);

    popupClose.forEach(element => {
        element.addEventListener('click', function () {
            if (document.querySelectorAll('.popup._active').length <= 1) {
                removeFunc(popup, true);
            } else {
                removeFunc(popup, false);
            }
            setTimeout(function () {
                return false;
            }, duration)
        });
    })


    setTimeout(() => {
        popupCheck = true;
    }, duration);

}

}

// =-=-=-=-=-=-=-=-=-=-=-=- </popup> -=-=-=-=-=-=-=-=-=-=-=-=

function scrollBarWidth() {
  let div = document.createElement('div');

  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';

  document.body.append(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;

  div.remove();

  return scrollWidth;
}


function validate(email, event) {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let address = email.value;
  if(reg.test(address) == false) {
      event.preventDefault();
      email.parentElement.parentElement.classList.add('_error');
      email.onblur = function () {
        email.parentElement.parentElement.classList.remove('_error');
      }
      return false;
  }
}

const headerBlocks = document.querySelectorAll('.header__select--block');
let customPromptCheck = true;

const chartTable = document.querySelectorAll('.chart__table');

function resize() {

  headerBlocks.forEach(selectBlock => {
    
    if(selectBlock.getBoundingClientRect().x < 0) {
      selectBlock.classList.add('_left')
    }
  
  })

  html.style.setProperty('--height-screen', window.innerHeight + 'px');
  if(window.innerWidth >= 1025) {
    menu.forEach(elem => {
      elem.classList.remove('_active');
    })
  }

  let prompt = document.querySelector('.custom-prompt-message'),
      customPrompt = document.querySelector('.??ustom-prompt');
  
  if(prompt && customPrompt && customPromptCheck) {
    prompt.classList.remove('_visbile');
    customPromptCheck = false;
    setTimeout(() => {
      prompt.remove();
      customPrompt.classList.remove('_active');
      customPromptCheck = true;
    },200)
  }

  chartTable.forEach(chartTable => {
    let wrapper = chartTable.closest('.chart__wrapper'),
        head = chartTable.querySelector('.chart__table--head'),
        body = chartTable.querySelector('.chart__table--body');

    wrapper.style.setProperty('--min-height-block', head.offsetHeight * 3 + body.offsetHeight + 'px');
  })
}

resize();

window.addEventListener('resize', resize);


function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

// =-=-=-=-=-=-=-=-=-=-=-=- <chart> -=-=-=-=-=-=-=-=-=-=-=-=

let chart = [];

let width, height, gradient;
function getGradient(ctx, chartArea, startColor, endColor) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {

        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(0.7, endColor);
        gradient.addColorStop(1, startColor);

    }

    return gradient;
}

function chartFunc(arg) {

  let ctx = document.querySelector(arg.id);
  let ctx2D = ctx.getContext("2d");

  function repeatLabels(labels) {
    let result = [];

    labels.forEach(function(item) {
      for(let count = 0; count < 24; count++) {
        result.push(item);
      }
    });
    
    return result;
  }

  let labels = repeatLabels(['01.07.22', '02.07.22', '03.07.22', '04.07.22', '05.07.22', '06.07.22', '07.07.22']);

  function repeatData(start, end, posStart) {
    let result = [], value = start;

    for(let count = 0; count <= end; count++) {
      
      value++;

      if(count >= posStart) {
        result.push(value);
      } else {
        result.push(NaN);
      }
      
    }

    return result;
  }

  const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');
  
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.classList.add('chart__tooltip');
      let tooltipElBody = document.createElement('div');
      tooltipElBody.classList.add('chart__tooltip--body');
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.transition = 'all .2s ease';
  
      tooltipEl.appendChild(tooltipElBody);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }
  
    return tooltipEl;
  };

  const externalTooltipHandler = (context) => {
    const {chart, tooltip} = context;
    
    const tooltipEl = getOrCreateTooltip(chart),
          tooltipElBody = document.createElement('div');
    tooltipElBody.classList.add('chart__tooltip--body');

    if(!tooltip.dataPoints[0].dataset.addData) {

      const tooltipTitle = document.createElement('h4'),
            tooltipDate = document.createElement('span'),
            tooltipPrice = document.createElement('strong');

      tooltipEl.style.setProperty('--line-height', 0 + 'px')
      
      tooltipTitle.classList.add('chart__tooltip--title');
      tooltipDate.classList.add('chart__tooltip--date');
      tooltipPrice.classList.add('chart__tooltip--price');

      tooltipTitle.textContent = tooltip.dataPoints[0].dataset.label;
      
      let valueText = tooltip.dataPoints[0].dataset.valueText,
          valueAfter = tooltip.dataPoints[0].dataset.valueAfter,
          valueColor = tooltip.dataPoints[0].dataset.valueColor,
          value = tooltip.dataPoints[0].raw;

      if(value >= 1000) {
        value = (value / 1000).toFixed(1) + "K";
      }

      if(valueColor) tooltipPrice.style.color = valueColor;
      tooltipPrice.textContent = `${(valueText) ? valueText : ''}${value}${(valueAfter) ? valueAfter : ''}`;
      
      if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }
    
      if (tooltip.body) {
        if(!tooltip.dataPoints[0].dataset.hideLabel) {

        const titleLines = tooltip.title || [];

          titleLines.forEach(title => {
            tooltipDate.textContent = title;
          });
        }

        const root = tooltipEl.querySelector('.chart__tooltip--body');
    
        while (root.firstChild) {
          root.firstChild.remove();
        }

        root.appendChild(tooltipTitle);
        if(!tooltip.dataPoints[0].dataset.hideLabel) {
          root.appendChild(tooltipDate);
        }
        root.appendChild(tooltipPrice);
        
      }

    } else {
      
      let label = `<span class="chart__tooltip--date">${tooltip.dataPoints[0].label}</span>`;
      let result = label;
      
      let title = 
      `<div class="chart__tooltip--param">${tooltip.dataPoints[0].dataset.label}: 
        <span style="color: ${tooltip.dataPoints[0].dataset.valueColor};">
          ${tooltip.dataPoints[0].formattedValue}
        </span>
      </div>`;
      result += title

      let addData = tooltip.dataPoints[0].dataset.addData, index = tooltip.dataPoints[0].dataIndex;

      if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }

      addData.forEach(data => {

        let value = data.data[index];
        if(value >= 1000) {
          value = (value / 1000).toFixed(1) + "K";
        }

        let color = data.valueColor;
        if(!color) color = ''; else color = ` style="color: ${color};"`

        let after = data.valueAfter;
        if(!after) after = '';

        let param = 
        `<div class="chart__tooltip--param">${data.label}: 
          <span${color}>${data.data[index]}${after}</span$>
        </div>`;
        result+=param;

      })

      const root = tooltipEl.querySelector('.chart__tooltip--body');
    
      while (root.firstChild) {
        root.firstChild.remove();
      }

      root.insertAdjacentHTML("beforeEnd", result);

    }
  
    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
    
    let resultHeight = 0;
    
    if(tooltipEl.closest('.chart-crosshair')) {
      let parent = tooltipEl.closest('.chart-crosshair'),
          canvas = parent.querySelectorAll('canvas');

      canvas.forEach(canvas => {        
        resultHeight += canvas.offsetHeight;
      })
    }

    if(tooltip.dataPoints[0].dataset.hideLabel) {
      if(tooltipEl.querySelector('.chart__tooltip--date')) {
        tooltipEl.querySelector('.chart__tooltip--date').remove();
      }
    }

    
    if((positionX + tooltip.caretX) > window.innerWidth) tooltipEl.classList.add('_right-pos'); else tooltipEl.classList.remove('_right-pos');

    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
    //tooltipEl.style.setProperty('--line-height', tooltipEl.style.setProperty('--line-height', chart.chartArea.height - tooltip.caretY + tooltipEl.offsetHeight + 70 + 'px') + 'px')
    if(resultHeight) tooltipEl.style.setProperty('--line-height', chart.chartArea.height - tooltip.caretY + tooltipEl.offsetHeight + 70 + 'px')
    
  };

  const getOrCreateLegendList = (chart, id) => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer.querySelector('ul');

  if (!listContainer) {
    listContainer = document.createElement('ul');
    listContainer.style.display = 'flex';
    listContainer.style.flexDirection = 'row';
    listContainer.style.margin = 0;
    listContainer.style.padding = 0;

    legendContainer.appendChild(listContainer);
  }

  return listContainer;
  };

  const htmlLegendPlugin = {
    id: arg.htmlLegendId,
    afterUpdate(chart, args, options) {
      
      const ul = getOrCreateLegendList(chart, arg.legendContainer);
      ul.classList.add('chart__settings-popup--list', 'm-0', 'p-0', 'mt-3')

      // Remove old legend items
      while (ul.firstChild) {
        ul.firstChild.remove();
      }

      // Reuse the built-in legendItems generator
      const items = chart.options.plugins.legend.labels.generateLabels(chart);

      items.forEach((item, index) => {
        const li = document.createElement('li')
        const btn = document.createElement('button');
        li.classList.add('chart__settings-popup--item')
        li.style.setProperty('--line-type', (item.lineDash.length) ? 'dashed' : 'solid');
        li.style.setProperty('--line-color', item.strokeStyle);
        btn.classList.add('chart__settings-popup--btn');
        if(index === 0){
          // btn.classList.add('_active');
          // chart.setDatasetVisibility(index, true);
        }else{
          // chart.setDatasetVisibility(index, false);
        }
        if(item.hidden) {
          btn.classList.remove('_active');
        }


        btn.textContent = item.text;

        li.appendChild(btn);
        //li.appendChild(textContainer);

        li.onclick = () => {
          if(btn.classList.contains('_active')) return;
          btn.classList.add('_active');
          const {type} = chart.config;
          if (type === 'pie' || type === 'doughnut') {
            // Pie and doughnut charts only have a single dataset and visibility is per item
            chart.toggleDataVisibility(item.index);
          } else {
            chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
          }
          chart.update();
        };

        ul.appendChild(li);
      });
    }
  };

  const logo = new Image();
  logo.src = 'js/chart-logo.svg';

  const chartLogo = {
    id: 'custom_canvas_background_image',
    beforeDraw: (chart) => {
      if (logo.complete) {
        
        const ctx = chart.ctx;
        const {top, left, width, height} = chart.chartArea;
        logo.width = width/1.5;
        if(window.innerWidth > 768) {
          logo.width = width/2;
        }
        logo.height = logo.width/10;
        const x = left + width / 2 - logo.width / 2;
        const y = top + height / 2 - logo.height / 2;
        ctx.drawImage(logo, x, y, logo.width, logo.height);
      } else {
        logo.onload = () => chart.draw();
      }
    }
  };

  const chartBgColor = {
    id: 'custom_canvas_background_color',
    beforeDraw: (chart) => {
      const {ctx} = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = pageBg;
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };

  let interaction;
  if(arg.multipleData) {
    interaction = {
      mode: 'nearest',
      intersect: false,
    }
  } else {
    interaction = {
      intersect: false,
    }
  }
	

  let retObjChart = new Chart(ctx2D, {
    type: 'line',
    data: arg.data,
    options: {
      animations: {
        y: { duration: 0 },
      },
      responsive: true,

      layout: arg.layout,
      
      interaction: interaction,

      scales: {
          y: {
            grid: {
              display: true,
              color: gridColor,
              borderDash: [5,5],
              borderColor: 'rgba(0,0,0,0)',
            },
            title: arg.yTitle,
            ticks: {
              color: chartTextColor,
              font: {
                family: "'Montserrat', sans-serif",
                size: 12,
              },
              callback: function (value) {
                // console.log(value);
                if(value % 1 !== 0){
                  value = value.toFixed(3);
                }
                if(value >= 1000) {
                  if(value % 1 !== 0){
                    return (value / 1000).toFixed(3) + "K";
                  }
                  return (value / 1000) + "K";
                } else {
                  return value;
                }
              }
            }
          },
          
          x: {
            grid: {
              display: true,
              color: gridColor,
              borderDash: [5,5],
              borderColor: 'rgba(0,0,0,0)',
            },
            display: (arg.hideLabels) ? true : true,
            ticks: {
              color: chartTextColor,
              font: {
                family: "'Montserrat', sans-serif",
                size: 12,
              },
              // callback: value => {
              //   console.log(value);
              //   return value;
              // }
            },
            
            
          },
      },
      
      plugins: {
        
          htmlLegend: {
              containerID: arg.legendContainer,
          },

          tooltip: {
            enabled: false,
            position: 'nearest',
            external: externalTooltipHandler
          },

          legend: {
              display: (arg.legend) ? arg.legend : false,
          },

          labels: {
            display: false,
            usePointStyle: true,
          },
       
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
              threshold: 5,
            },
            zoom: {
              wheel: {
                enabled: true,
                speed: .02
              },
              pinch: {
                enabled: true
              },
              mode: 'xy',
            },
            limits: {
              y: {min: 0},
            },
        },
      }
    },
    plugins: (arg.legendContainer && arg.htmlLegendId) ? [htmlLegendPlugin, chartLogo, chartBgColor] : [chartLogo, chartBgColor],

  })
  chart[chart.length] = retObjChart

  const canvasWrapp = document.querySelector(arg.id).closest('.chart__wrapper');
  const zoomPlusBtn = canvasWrapp.querySelector('.chart-zoom-btn-plus');
  const zoomMinusBtn = canvasWrapp.querySelector('.chart-zoom-btn-minus');
  const zoomRestoreBtn = canvasWrapp.querySelector('.chart-zoom-btn-restore');

  if(zoomPlusBtn){
    zoomPlusBtn.addEventListener('click', function(event){
      event.preventDefault();
      retObjChart.zoom(1.1);
    }, false)
  }

  if(zoomMinusBtn){
    zoomMinusBtn.addEventListener('click', function(event){
      event.preventDefault();
      retObjChart.zoom(0.9);
    }, false)
  }
  
  if(zoomRestoreBtn){
    zoomRestoreBtn.addEventListener('click', function(event){
      event.preventDefault();
      retObjChart.resetZoom();
    }, false)
  }

  return retObjChart


}

/* let chartBar = [];

function barChart(arg) {
  let ctx = document.querySelector(arg.id);
  let ctx2D = ctx.getContext("2d");

  chartBar[chartBar.length] = new Chart(ctx2D, 
    {
      type: 'bar',
      data: arg.data,
      options: {
        legend: {
          display: false
        },

        layout: arg.layout,

        plugins: {
          tooltip: {
            enabled: false,
            mode: 'interpolate',
            intersect: false
          },
          labels: {
            display: false,
          },
          legend: {
            display: false,
            labels: {
                display: false,
            }
          }
        },
        scales: {
          x: {
            display: false,
            stacked: true,
            grid: {
              display: false,
              borderColor: 'rgba(0,0,0,0)',
            },
          },
          y: {
            
            stacked: true,
            grid: {
              display: false,
              borderColor: 'rgba(0,0,0,0)',
            },
            ticks: {
              color: 'rgba(0,0,0,0)'
            },
            
          }
        }
      }
    })
} */

function counstructBarChart(arg) {

  const block = document.querySelector(arg.id),
        chartId = arg.chartId;

  if(block) {

    let widthChart, paddingLeft, lengthLabels;
    chart.forEach(chart => {
      if(chart.canvas.id == chartId) {

        lengthLabels = chart.data.labels.length;
        widthChart = chart.chartArea.width + chart.chartArea.left;
        paddingLeft = chart.chartArea.left;

      }
    })

    let data = arg.data, items = [], wrapper = document.createElement('div');
    wrapper.classList.add('chart-bar');

    for(let index = 0; index < data.length; index++) {
      items.push(`
      <div class="chart-bar-item">
        <div class="chart-bar-item-plus">
            <div class="chart-bar-item-value" style="height: ${data[index][0]}%;"></div>
        </div>
        <div class="chart-bar-item-minus">
            <div class="chart-bar-item-value" style="height: ${data[index][1]}%"></div>
        </div>
      </div>`)
    }

    items.forEach(item => {
      wrapper.insertAdjacentHTML("beforeEnd", item);
    })

    block.append(wrapper);

    let item = document.querySelectorAll('.chart-bar-item');
    
    if(window.innerWidth <= 1025) {
      wrapper.style.width = '100%';
    } else {
      wrapper.style.width = widthChart + widthChart/lengthLabels + 'px';
    }
    
    wrapper.style.paddingLeft = paddingLeft + 'px';

    window.addEventListener('resize', function() {
      setTimeout(() => {
        chart.forEach(chart => {
          if(chart.canvas.id == chartId) {
            widthChart = chart.chartArea.width + chart.chartArea.left,
            paddingLeft = chart.chartArea.left;
          }
        })
  
        if(window.innerWidth <= 1025) {
          wrapper.style.width = '100%';
        } else {
          wrapper.style.width = widthChart + widthChart/lengthLabels + 'px';
        }

        wrapper.style.paddingLeft = paddingLeft + 'px';
        
      },1000)
    })

    if(arg.title) {
      block.insertAdjacentHTML("afterbegin", `<div class="chart-bar-title">${arg.title}</div>`);
      
    }

  }

}

// =-=-=-=-=-=-=-=-=-=-=-=- </chart> -=-=-=-=-=-=-=-=-=-=-=-=

let thisTarget, traderNavCheck = true;
body.addEventListener('click', function (event) {

    thisTarget = event.target;

    if (thisTarget.closest('._burger')) {
      menu.forEach(elem => {
          elem.classList.toggle('_active')
      })
    }

    

    let submitBtn = thisTarget.closest('.login__form--submit');
    if(submitBtn) {
      
      if(submitBtn.classList.contains('_disabled')) {

        event.preventDefault();

      } else {

        let form = submitBtn.closest('form'),
        emailInput = form.querySelector('.email-input');

        if(emailInput) validate(emailInput, event);

      }
      

    }



    let timerBtn = thisTarget.closest('.login__verification--btn');
    if(timerBtn) {
      if(!timerBtn.classList.contains('_disabled')) {
        timerBtn.classList.add('_disabled');
        timer();
      }
    }



    let headerThemeSwitch = thisTarget.closest('.header__theme--switch');
    if(headerThemeSwitch) {
      body.classList.add('theme-switch-animate');

      setTimeout(function(){
        body.classList.remove('theme-switch-animate');
      }, 300);

      headerThemeSwitch.classList.toggle('_active');

      if(headerThemeSwitch.classList.contains('_active')) {

        setTimeout(() => {
          chartTextColor = '#9899A6';
          gridColor = 'rgba(129, 159, 189, 0.2)';
          pageBg = 'rgba(0, 0, 0, 0)';

          setCookie('godbot.pro-theme', 'dark', {secure: false, 'max-age': 36000000});

          if(chart.length)  {
            chart.forEach(chart => {
              chart.options.scales.y.ticks.color = chartTextColor;
              chart.options.scales.y.grid.color = gridColor;
              chart.options.scales.x.ticks.color = chartTextColor;
              html.style.setProperty('--theme-opacity', 0);

              chart.update();

              setTimeout(() => {
                  html.style.setProperty('--theme-opacity', 1);
              },0)

            })
          }
          
          body.classList.add('_dark-theme')
        },0)

        
      } else if(!headerThemeSwitch.classList.contains('_active')) {

        setTimeout(() => {
          chartTextColor = '#262628';
          gridColor = 'rgba(129, 159, 189, 0.5)';
          pageBg = '#FFFFFF';

          setCookie('godbot.pro-theme', 'light', {secure: false, 'max-age': 36000000});

          if(chart.length)  {
            chart.forEach(chart => {
              chart.options.scales.y.ticks.color = chartTextColor;
              chart.options.scales.y.grid.color = gridColor;
              chart.options.scales.x.ticks.color = chartTextColor;
              html.style.setProperty('--theme-opacity', 0);
              
              setTimeout(() => {
                  html.style.setProperty('--theme-opacity', 1);
              },0)

              setTimeout(() => {
                chart.update();
              }, 150);
              
            })
          }

          body.classList.remove('_dark-theme');
        },0)

      }

    }
    


    let headerSelectSelected = thisTarget.closest('.header__select--selected')
    if(headerSelectSelected) {

      if(headerSelectSelected.classList.contains('_active')) {
        document.querySelectorAll('.header__select--selected._active').forEach(thisSelected => {
          thisSelected.classList.remove('_active')
        })
      } else {
        document.querySelectorAll('.header__select--selected._active').forEach(thisSelected => {
          thisSelected.classList.remove('_active')
        })
        headerSelectSelected.classList.add('_active');
      }
     
    } else if(!thisTarget.closest('.header__select')) {
      document.querySelectorAll('.header__select--selected._active').forEach(thisSelected => {
        thisSelected.classList.remove('_active')
      })
    }



    let headerProfileSettingsOpen = thisTarget.closest('.header__profile--settings-open'),
        headerProfileSettings = document.querySelector('.header__profile--settings');
    if(headerProfileSettingsOpen) {
      event.preventDefault();

      headerProfileSettings.classList.add('_active');

    } else if(headerProfileSettings && (!thisTarget.closest('.header__profile--settings') || !thisTarget.closest('.header__profile--settings-open') || thisTarget.closest('.header__profile--settings-close'))) {
      headerProfileSettings.classList.remove('_active');
    }



    let chartSettingsLink = thisTarget.closest('.chart__settings--link');
    if(chartSettingsLink) {
      event.preventDefault();

      let chartWrapper = document.querySelector('.chart__wrapper'),
          chartPopup = chartWrapper.parentElement.querySelector('.chart__settings-popup');

      chartPopup.classList.add('_active');
      chartWrapper.classList.add('_blur');

    } else if((!thisTarget.closest('.chart__settings-popup') && !thisTarget.closest('.chart__settings-popup--btn')) || thisTarget.closest('.chart__settings-popup--close')) {

      
      let chartWrapper = document.querySelector('.chart__wrapper'),
          chartPopup = (chartWrapper) ? chartWrapper.parentElement.querySelector('.chart__settings-popup') : false;

      if(chartPopup) {
        chartPopup.classList.remove('_active');
        chartWrapper.classList.remove('_blur');
      }
      
    }



    let traderTabNavLink = thisTarget.closest('.trader__tab-nav--link');
    if(traderTabNavLink) {
      event.preventDefault();

      if(traderNavCheck) {

        let parent = traderTabNavLink.parentElement,
            tabWrapper = document.querySelector('.tab-wrapper'),
            idBlock = traderTabNavLink.getAttribute('href');

        if(!parent.classList.contains('_active') && traderNavCheck) {
          traderNavCheck = false;
      
          document.querySelectorAll('.trader__tab-nav--item').forEach(traderTabItem => {
            traderTabItem.classList.remove('_prev');
            traderTabItem.classList.remove('_active');
            traderTabItem.classList.remove('_next');
          })
  
          parent.classList.add('_active');
          
          let next = parent.nextElementSibling,
              prev = parent.previousElementSibling;
  
          if(prev) prev.classList.add('_prev');
          if(next) next.classList.add('_next');

          document.querySelectorAll('.tab-block').forEach(tabBlock => {
            tabBlock.classList.remove('_visible')
            tabWrapper.style.setProperty('--min-height', tabWrapper.offsetHeight + 'px');
            setTimeout(() => {
              tabBlock.classList.remove('_active');
            },200)
          })

          let tabBlockActive = document.querySelector(idBlock);
          
          setTimeout(() => {
            tabBlockActive.classList.add('_active');
            
            setTimeout(() => {
              tabBlockActive.classList.add('_visible');
              traderNavCheck = true;
              tabWrapper.style.setProperty('--min-height', 0 + 'px');
            },100)
          },200)
          
        }

      }
      
    }



    /* let copyBtn = thisTarget.closest('._copy-input-btn');
    if (copyBtn) {
      event.preventDefault();
      
      let input = copyBtn.parentNode.querySelector('._copy-input');
  
      if (input) {
  
        copyToClipboard(input)
  
      }
  
    } */



    let slideBtn = thisTarget.closest('._slide-btn');
    if(slideBtn) {

      if(!slideBtn.classList.contains('_sliding')) {

        slideBtn.classList.add('_sliding');

        let block = slideBtn.closest('._slide-block'),
            time = (Number(block.dataset.time)) ? Number(block.dataset.time) : 1000,
            content = block.querySelector('._slide-content');

        if(slideBtn.classList.contains('_active')) {

          slideUp(content, time);
          block.classList.remove('_active');
          slideBtn.classList.remove('_active')

        } else {

          slideDown(content, time);
          slideBtn.classList.add('_active');
          setTimeout(() => { block.classList.add('_active'); }, time)

        }

        setTimeout(() => {
          slideBtn.classList.remove('_sliding');
        },time)
      }

    }



    let btnPopup = thisTarget.closest('._open-popup');
    if(btnPopup) {
      event.preventDefault();
    
      popup({
        id: (btnPopup.getAttribute('href')) ? btnPopup.getAttribute('href') : btnPopup.dataset.id
      });
    
    }

    let popupClose = thisTarget.closest('._popup-close');
    if(popupClose) {
      let popup = popupClose.closest('.popup');
      FX.fadeOut(popup, {
        duration: 200,
        complete: function () {
          if(popupClose.classList.contains('_remove-popup')) popup.remove();
          popup.style.display = 'none';
        }
      });
      popup.classList.remove('_active');

      setTimeout(() => {
          popupCheckClose = true;
      }, 200)

      if (header) header.classList.remove('_popup-active');

      setTimeout(function () {

          body.classList.remove('_popup-active');
          html.style.setProperty('--popup-padding', '0px');

      }, 200)
    }



    let promoOpenBtn = thisTarget.closest('.tariffs-popup__slide--promo-open-btn');
    if(promoOpenBtn) {
      let parent = promoOpenBtn.parentElement.querySelector('.tariffs-popup__slide--promo-block');

      parent.classList.remove('_hidden');
      promoOpenBtn.classList.add('_hidden');

    }



    let openMinPopup = thisTarget.closest('._open-min-popup');
    if(openMinPopup) {

      let wrapper = openMinPopup.closest('._min-popup-wrapper'),
          popup = wrapper.querySelector('._min-popup');

      popup.classList.add('_active');

    } else {
      if(!thisTarget.closest('._min-popup')) {
        document.querySelectorAll('._min-popup').forEach(minPopup => {
          minPopup.classList.remove('_active');
        })
      }
    }



    let sendTariffBtn = thisTarget.closest('._send-tariff-btn');
    if(sendTariffBtn) {
      event.preventDefault();

      sendTariffBtn.classList.add('_btn-active');
      sendTariffBtn.textContent = sendTariffBtn.dataset.sendTariffText;

    }



    let maxBtn = thisTarget.closest('._max-input-btn');
    if(maxBtn) {
      event.preventDefault();
      let input = maxBtn.parentElement.querySelector('._max-input');
      input.value = input.getAttribute('maxlength');
    }


    let paymentSubmit = thisTarget.closest('.payment__txid--submit');
    if(paymentSubmit) {
      event.preventDefault();

      paymentSubmit.classList.add('_disabled');

      let paymentInfoStatus = document.querySelector('.payment__info-status'),
          paymentExpect = `<strong class="payment__info-status--expect purple">${paymentSubmit.dataset.expectText}</strong>`;

      paymentInfoStatus.innerHTML = paymentExpect;

    }



    let messageClose = thisTarget.closest('._message-close');
    if(messageClose) {
      
      let item = messageClose.closest('._message-item');
      if(item) {
        item.classList.remove('_visible');
        setTimeout(() => {
          item.remove();
        },200)
      }

    }



    let messagesRatingLabel = thisTarget.closest('.messages__rating--label');
    if(messagesRatingLabel) {
      let messageRating = messagesRatingLabel.closest('.messages__rating');
      setTimeout(() => {
        messageRating.classList.remove('_visible');
      },1000)
    }


    
    let getIpBtn = thisTarget.closest('.get-ip-btn');
    if(getIpBtn) {
      event.preventDefault();

      let getIpWrapper = getIpBtn.closest('.get-ip-wrapper'),
          getIpInput = getIpWrapper.querySelectorAll('.get-ip-input');

      getIpInput.forEach(getIpInput => {

        fetch('https://api.ipify.org/?format=json')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          getIpInput.value = data.ip;
        });
        
      })

    }

})


const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))



let verificationInputs = document.querySelectorAll('.login__verification--input'),
    controlCheck = false, pasteStatus = false;
verificationInputs.forEach(thisInput => {

  thisInput.oninput = function(event) {
    
    if(event.inputType == 'insertText' && event.data.length == 1) {
      
      pasteStatus = false;

      let nextElement = event.target.parentElement.nextElementSibling,
          form = event.target.closest('form');
      
      thisInput.value = thisInput.value[thisInput.value.length-1].replace(/\D/g,'').substr(0,9);

      if(nextElement.classList.contains('login__verification--label') && thisInput.value) {
        nextElement.querySelector('input').focus();
      }

      if(checkInput()) {
        form.querySelector('.login__form--submit').classList.add('_disabled')
      } else {
        form.querySelector('.login__form--submit').classList.remove('_disabled')
      }

    }

    if(event.inputType == 'insertFromDrop' || event.data.length > 1) {
      pasteStatus = false;

      let pastedText = event.target.value.replace(/[^\d]/g, ''),
      pastedCheck = false,
      form = event.target.closest('form'),
      lengthPastedText;
      

      if(pastedText) {
        pastedCheck = true;
        lengthPastedText = pastedText.length;
        pastedText = pastedText.split('');
      }
      
      event.target.value = '';
      if(pastedCheck) {

        let index = 0, checkValue = true;
        verificationInputs.forEach(input => {
          if(pastedText[index]) {
            input.value = pastedText[index];
            index++;
            input.focus();
          } else if(checkValue) {
            checkValue = false;
            input.focus();
          }
          
        })
        
        if(lengthPastedText >= 6) {
          form.querySelector('.login__form--submit').classList.remove('_disabled')
        } else {
          form.querySelector('.login__form--submit').classList.add('_disabled')
        }
      }
    }

  }

  function ctrlZ(e) {
    var evtobj = window.event? event : e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey) return true; else return false;
}

  thisInput.addEventListener('keydown', function(event) {

    if(event.key == 'Backspace' || event.key == 'Delete') {
      event.preventDefault();
      pasteStatus = false;
      
      let checkValue = (event.target.value) ? false : true;
      event.target.value = '';

      let prevElement = event.target.parentElement.previousElementSibling,
          nextElement = event.target.parentElement.nextElementSibling,
          form = event.target.closest('form');
      
      if(prevElement) {
        if(prevElement.classList.contains('login__verification--label') && !event.target.value) {
          
          if(checkValue) {
            prevElement.querySelector('input').value = '';
            prevElement.querySelector('input').focus();
          }
        }
      } else {
        event.target.value = '';
      }
      
      if(checkInput()) {
        form.querySelector('.login__form--submit').classList.add('_disabled')
      } else {
        form.querySelector('.login__form--submit').classList.remove('_disabled')
      }
      
    }

    if(ctrlZ(event) && pasteStatus) {
      verificationInputs.forEach(input => {
        input.value = '';
      })
    }
  })

  thisInput.addEventListener('keyup', function(event) {
    if(event.key == 'Control') {
      controlCheck = false;
    }
  })

  thisInput.addEventListener('paste', function(event) {
    
    let pastedText = event.clipboardData.getData('Text').replace(/[^\d]/g, ''),
        form = event.target.closest('form'),
        lengthPastedText,
        pastedCheck = false;

    if(pastedText) {
      pastedCheck = true;
      lengthPastedText = pastedText.length;
      pastedText = pastedText.split('');
    }
    
    setTimeout(() => {
      pasteStatus = true;
      event.target.value = '';
      if(pastedCheck) {
        verificationInputs.forEach(input => {
          input.value = '';
        })
        let index = 0, checkValue = true;
        verificationInputs.forEach(input => {
          if(pastedText[index]) {
            input.value = pastedText[index];
            index++;
            input.focus();
          } else if(checkValue) {
            checkValue = false;
            input.focus();
          }
          
        })

        if(lengthPastedText >= 6) {
          form.querySelector('.login__form--submit').classList.remove('_disabled')
        } else {
          form.querySelector('.login__form--submit').classList.add('_disabled')
        }
      }
      
    },0)
    
  })

})

function checkInput() {
  for(let index = 0; index < verificationInputs.length; index++) {
    if(!verificationInputs[index].value) {
      return true;
    }
  }
}

// =-=-=-=-=-=-=-=-=-=-=-=- <TIMERS> -=-=-=-=-=-=-=-=-=-=-=-=

function timer() {
  const timerElems = document.querySelectorAll('._timer');

  timerElems.forEach(thisTimerElem => {

    thisTimerElem.style.display = 'block';
    thisTimerElem.nextElementSibling.style.display = 'none';

    let seconds = thisTimerElem.dataset.timer;
    seconds = Number(seconds.substring(0, thisTimerElem.dataset.timer.length - 1));

    function timerFunc() {
      thisTimerElem.textContent = seconds + 's';

      if(seconds == 0) {
        clearTimeout(timerInterval);
        thisTimerElem.parentElement.classList.remove('_disabled');
        thisTimerElem.style.display = 'none';
        thisTimerElem.nextElementSibling.style.display = 'block';
      } else {
        seconds--;
      }
    }

    timerFunc();

    let timerInterval = setInterval(timerFunc, 1000)

  });

}

timer();

function timerUpdate() {
  const timerElems = document.querySelectorAll('.timer');

  let deadline;

  timerElems.forEach(thisTimerElem => {

    deadline = new Date(

    thisTimerElem.dataset.timerYear,
    Number(thisTimerElem.dataset.timerMonth - 1),
    thisTimerElem.dataset.timerDay,
    thisTimerElem.dataset.timerHour,
    Number(thisTimerElem.dataset.timerMinute) + 1);

    let thisDate = new Date();

    const text = thisTimerElem.dataset.timerText;

    let diff = deadline - thisDate,
    days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0,
    hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0,
    minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0,
    seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

    if((deadline - thisDate) <= 0) {
      window.location.reload();
    }

    
    thisTimerElem.innerHTML = `<span>${text} <span>${(minutes > 9) ? minutes : '0' + minutes} ??????</span> <span>${(seconds > 9) ? seconds : '0' + seconds} ??????</span></span>`;
    
    

  });

}

if(document.querySelector('.timer')) {
  setInterval(() => {
    timerUpdate();
  },1000)
}

function timerPaymentCancel() {
  const timerElems = document.querySelectorAll('.timerPaymentCancel');

  let deadline;

  timerElems.forEach(thisTimerElem => {

    deadline = new Date(

    thisTimerElem.dataset.timerpaymentcancelYear,
    Number(thisTimerElem.dataset.timerpaymentcancelMonth - 1),
    thisTimerElem.dataset.timerpaymentcancelDay,
    thisTimerElem.dataset.timerpaymentcancelHour,
    Number(thisTimerElem.dataset.timerpaymentcancelMinute) + 1);

    let thisDate = new Date();

    const text = thisTimerElem.dataset.timerpaymentcancelText;

    let diff = deadline - thisDate,
    days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0,
    hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0,
    minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0,
    seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

    thisTimerElem.innerHTML = `<span>${text} <span>${(minutes > 9) ? minutes : '0' + minutes}</span>:<span>${(seconds > 9) ? seconds : '0' + seconds}</span></span>`;

  });

}

if(document.querySelector('.timerPaymentCancel')) {
  setInterval(() => {
    timerPaymentCancel();
  },1000)
}

if(document.querySelector('.redirect')) {
  const redirects = document.querySelectorAll('.redirect');
  redirects.forEach(redirect => {

    let count = (Number(redirect.dataset.redirectDelay)) ? Number(redirect.dataset.redirectDelay) : 5, redirectValue = redirect.querySelector('.redirect-value'),
    interval = setInterval(() => {
      count--;

      let text = '';

      if(count >= 5) text = redirect.dataset['redirect-5'];
      if(count >= 2 && count <= 4) text = redirect.dataset['redirect-2-4'];
      if(count == 1) text = redirect.dataset['redirect-1'];
      if(count == 0) text = redirect.dataset['redirect-0'];

      if(count <= 0) {

        redirectValue.textContent = count + ' ' + text;
        clearInterval(interval);

        window.location.href = (redirect.dataset.redirectPage) ? redirect.dataset.redirectPage : '/';

      } else {
        redirectValue.textContent = count + ' ' + text;
      }

    },1000);

    
  })
  
}

function messageItemTimer() {
  const messageTimer = document.querySelectorAll('.message-item-timer');
  messageTimer.forEach(messageTimer => {

    const messageItem = messageTimer.closest('._message-item');

    let duration = Number(messageTimer.dataset.timerDuration.slice(0,-1)),
        current = 0, strokeDasharray = Number(messageTimer.getAttribute('stroke-dasharray')),

        strokeDashoffset = strokeDasharray = strokeDasharray / duration;

    let interval = setInterval(() => {
      messageTimer.setAttribute('stroke-dashoffset', Number(messageTimer.getAttribute('stroke-dashoffset')) + strokeDashoffset);
      if(duration <= current) {
        messageItem.classList.remove('_visible');
        setTimeout(() => {
          messageItem.remove();
        },200)
        clearInterval(interval);
      }
      current++;
    },1000)
    
  })
}

messageItemTimer();

function disabledTimer() {
  const timerElems = document.querySelectorAll('.disabled-timer');

  function num_word(value, words){  
    value = Math.abs(value) % 100; 
    var num = value % 10;
    if(value > 10 && value < 20) return words[2]; 
    if(num > 1 && num < 5) return words[1];
    if(num == 1) return words[0]; 
    return words[2];
  }

  let deadline;

  timerElems.forEach(thisTimerElem => {

    deadline = new Date(

    thisTimerElem.dataset.timerYear,
    Number(thisTimerElem.dataset.timerMonth - 1),
    thisTimerElem.dataset.timerDay,
    thisTimerElem.dataset.timerHour,
    Number(thisTimerElem.dataset.timerMinute) + 1);

    let thisDate = new Date();

    const text = thisTimerElem.dataset.timerText;

    let diff = deadline - thisDate,
    days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0,
    hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0,
    minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0,
    seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

    thisTimerElem.textContent = `${text} ${num_word(minutes, [`${minutes} ????????????`, `${minutes} ????????????`, `${minutes} ??????????`])}`;
    
  });
}

disabledTimer();


// =-=-=-=-=-=-=-=-=-=-=-=- </TIMERS> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

let loginSlider = new Swiper('.login__slider', {
  
    spaceBetween: 30,
    slidesPerView: 1,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }

});

let tariffsSlider = new Swiper('.tariffs-popup__slider', {
  
  spaceBetween: 20,
  slidesPerView: 1,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  breakpoints: {
    992: {
      slidesPerView: 3,
    },

    600: {
      slidesPerView: 2,
    },
  }

});

if(document.querySelectorAll('.add-aside__slider--slide').length >= 2) {
  let asideSlider = new Swiper('.add-aside__slider', {
  
    spaceBetween: 30,
    slidesPerView: 1,
    loop: true,
  
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
  
  }); 
}



// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=

var instances = OverlayScrollbars(document.querySelectorAll('.custom-scrollbar'), { }); 
    
if(document.querySelector('#neural-network')) {
  const data = {
      labels: ['01.07.22', '02.07.22', '03.07.22', '04.07.22', '05.07.22', '06.07.22', '07.07.22','01.07.22', '02.07.22', '03.07.22', '04.07.22', '05.07.22', '06.07.22', '07.07.22', '01.07.22', '02.07.22', '03.07.22', '04.07.22', '05.07.22', '06.07.22', '07.07.22','01.07.22', '02.07.22', '03.07.22', '04.07.22', '05.07.22', '06.07.22', '07.07.22', '01.07.22', '02.07.22', '03.07.22', '04.07.22', '05.07.22', '06.07.22', '07.07.22','01.07.22', '02.07.22', '03.07.22', '04.07.22', '05.07.22', '06.07.22', '07.07.22', '01.07.22', '02.07.22', '03.07.22', '04.07.22', '05.07.22', '06.07.22', '07.07.22','01.07.22', '02.07.22', '03.07.22', '04.07.22', '05.07.22', '06.07.22', '07.07.22'],
      datasets: [
      {
          label: 'Line 1',
          data: [11000, 14000, 13000, 12000, 12500, 11320, 15000, 11000, 14000, 13000, 12000, 12500, 11320, 15000, 11000, 14000, 13000, 12000, 12500, 11320, 15000, 11000, 14000, 13000, 12000, 12500, 11320, 15000, 11000, 14000, 13000, 12000, 12500, 11320, 15000, 11000, 14000, 13000, 12000, 12500, 11320, 15000, 11000, 14000, 13000, 12000, 12500, 11320, 15000, 11000, 14000, 13000, 12000, 12500, 11320, 15000],
          backgroundColor: 'rgba(202, 57, 12, 0)',
          borderColor: [
              'rgba(202, 57, 12, 1)'
          ],
          pointRadius: 0,
          borderWidth: 2,
          cubicInterpolationMode: 'monotone',
          fill: true,
          tension: 0.4,

          valueText: 'PRICE: ',
          valueColor: 'rgba(202, 57, 12, 1)',
          
      },
      {
          label: 'Line 2',
          data: [1500, 22000, 10000, 15000, 13000, 14000, 10000, 10000, 22000, 10000, 15000, 13000, 14000, 10000, 15000, 22000, 10000, 15000, 13000, 14000, 10000, 100, 220, 1000, 15000, 13000, 14000, 10000, 1500, 22000, 12000, 15000, 13000, 14000, 10000, 10000, 22000, 10000, 15000, 13000, 14000, 10000, 15000, 22000, 10000, 15000, 13000, 14000, 10000, 100, 220, 1000, 15000, 13000, 14000, 10000],
          backgroundColor: 'rgba(202, 57, 12, 0)',
          borderColor: [
          'rgba(27, 163, 73, 1)'
          ],
          pointRadius: 0,
          pointHoverRadius: 5,
          borderWidth: 2,
          cubicInterpolationMode: 'monotone',
          fill: true,
          tension: 0.4,

          valueText: 'PRICE: ',
          valueColor: 'rgba(27, 163, 73, 1)',
      },
      {
          label: 'Line 3',
          data: [11000, 9000, 12000, 14000, 13500, 10500, 9000, 11000, 9000, 12000, 14000, 13500, 10500, 9000, 11000, 9000, 12000, 14000, 13500, 10500, 9000, 11000, 9000, 12000, 14000, 13500, 10500, 9000, 11000, 9000, 12000, 14000, 13500, 10500, 9000, 11000, 9000, 12000, 14000, 13500, 10500, 9000, 11000, 9000, 12000, 14000, 13500, 10500, 9000, 11000, 9000, 12000, 14000, 13500, 10500, 9000],
          backgroundColor: 'rgba(27, 163, 73, 1)',
          borderColor: [
              'rgba(27, 163, 73, 1)'
          ],
          pointRadius: 0,
          pointHoverRadius: 5,
          borderWidth: 2,
          cubicInterpolationMode: 'monotone',
          fill: false,
          tension: 0.4,

          valueText: 'PRICE: ',
          valueColor: 'rgba(27, 163, 73, 1)',
      },
      {
          label: 'Dashed',
          data: [10000, 12000, 14000, 13000, 12000, 11000, 13000, 10000, 12000, 14000, 13000, 12000, 11000, 13000, 10000, 12000, 14000, 13000, 12000, 11000, 13000, 10000, 12000, 14000, 13000, 12000, 11000, 13000, 10000, 12000, 14000, 13000, 12000, 11000, 13000, 10000, 12000, 14000, 13000, 12000, 11000, 13000, 10000, 12000, 14000, 13000, 12000, 11000, 13000, 10000, 12000, 14000, 13000, 12000, 11000, 13000],
          borderColor: [
              'rgba(202, 57, 12, 1)'
          ],
          pointRadius: 0,
          pointHoverRadius: 5,
          borderWidth: 2,
          borderDash: [5, 5],
          cubicInterpolationMode: 'monotone',
          fill: false,
          tension: 0.4,

          valueText: 'PRICE: ',
          valueColor: 'rgba(202, 57, 12, 1)',
      }
  ]
};
  let chart = chartFunc({
      id: '#neural-network',
      htmlLegendId: 'htmlLegend',
      legendContainer: 'legend-container',

      data: data,
      
  })

 
}

if(document.querySelector('#scalping-chart')) {
  const data = {
      labels: ['01.07.22', '02.07.22', '03.07.22', '04.07.22', '05.07.22', '06.07.22', '07.07.22'],
      datasets: [
          {
              label: '1 ????????????',
              data: [11000, 14000, 13000, 12000, 12500, 11320, 14000, 15000],
              backgroundColor: 'rgba(202, 57, 12, 1)',
              borderColor: [
                  'rgba(202, 57, 12, 1)'
              ],
              pointRadius: 0,
              borderWidth: 2,
              cubicInterpolationMode: 'monotone',
              fill: false,
              tension: 0.4,

              valueText: 'PRICE: ',
              valueColor: 'rgba(202, 57, 12, 1)',
              
          },
          {
              label: '5 ??????????',
              data: [10000, 13000, 12000, 14000, 13500, 10500, 11000],
              backgroundColor: 'rgba(27, 163, 73, 1)',
              borderColor: [
              'rgba(27, 163, 73, 1)'
              ],
              pointRadius: 0,
              pointHoverRadius: 5,
              borderWidth: 2,
              cubicInterpolationMode: 'monotone',
              fill: false,
              tension: 0.4,

              valueText: 'PRICE: ',
              valueColor: 'rgba(27, 163, 73, 1)',
          }
      ]
  };

  
//zoom
 let chart = chartFunc({
      id: '#scalping-chart',
      htmlLegendId: 'scalpingLegend',
      legendContainer: 'scalping-chart-legend',
      data: data,
  })


}

    let count = 0;



if(document.querySelector('#trading-chart')) {
  
  let ctx = document.querySelector('#trading-chart');
  
  const data = {
      labels: ['01.07.22', '02.07.22', '03.07.22', '04.07.22', '05.07.22', '06.07.22', '07.07.22'],
      datasets: [
          {
              label: '??????????',
              data: [11000, 14000, 13000, 12000, null, null, null],
              backgroundColor: '#07A60D',
              borderColor: [
                  '#07A60D'
              ],

              pointRadius: 0,
              borderWidth: 2,
              cubicInterpolationMode: 'monotone',
              fill: false,
              tension: 0.4,

              valueText: 'PRICE: ',
              valueColor: '#07A60D',
              
          },
          {
              label: '??????????',
              data: [null, null, null, 12000, 12500, 11320, 14000],
              backgroundColor: '#001FF0',
              borderColor: [
                  '#001FF0'
              ],

              pointRadius: 0,
              borderWidth: 2,
              cubicInterpolationMode: 'monotone',
              fill: false,
              tension: 0.4,

              valueText: 'PRICE: ',
              valueColor: '#001FF0',
              
          },
          /* {
              label: '5 ??????????',
              data: [10000, 13000, 12000, 14000, 13500, 10500, 11000],
              backgroundColor: 'rgba(27, 163, 73, 1)',
              borderColor: [
              'rgba(27, 163, 73, 1)'
              ],
              pointRadius: 0,
              pointHoverRadius: 5,
              borderWidth: 1,
              cubicInterpolationMode: 'monotone',
              fill: false,
              tension: 0.4
          } */
      ]
  };
  let chart = chartFunc({
      id: '#trading-chart',
      data: data,
      
  })


}

function repeatData(min,max) {
  function randomInteger(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
  }

  let dataResult = [], labelsResult = [];

  for(let count = 1; count < 31; count++) {
      labelsResult.push(count);
  }

  for(let count = 1; count < 31; count++) {
      dataResult.push(randomInteger(min, max));
  }

  return {
      data: dataResult,
      labels: labelsResult,
  }
}

let result = repeatData(1,99).data, amountDeals = repeatData(20,50).data;

if(document.querySelector('#deposit-chart')) {

  let ctx = document.querySelector('#deposit-chart');
  
  const data = {
      labels: repeatData(1,99).labels,
      datasets: [
          {
              label: '?????????????? ?????????????? ?? ????????????????',
              data: result,
              backgroundColor: function(context) {
                  const chart = context.chart;
                  const {ctx, chartArea} = chart;

                  if (!chartArea) {
                      return;
                  }
                      return getGradient(ctx, chartArea, 'rgba(0, 31, 240, 0.3)', 'rgba(221, 0, 240, 0.1)');
              },
              borderColor: [
                  '#001FF0'
              ],
              pointRadius: 0,
              borderWidth: 2,
              cubicInterpolationMode: 'monotone',
              fill: true,
              tension: 0.4,

              valueText: '',
              hideLabel: true,

              /* addData: [
                  {
                      label: '???????????????????? ????????????',
                      data: repeatData(10,50).data,
                      valueColor: '#88019E',
                  },
                  {
                      label: '???????????????????? ???????????????????? ????????????',
                      data: repeatData(10,40).data,
                      valueColor: '#12921E',
                  },
              ], */

              valueColor: '#001FF0',
              valueAfter: '%',
              
          },
          {
              label: '???????????????????? ????????????',
              data: amountDeals,
              backgroundColor: function(context) {
                  const chart = context.chart;
                  const {ctx, chartArea} = chart;

                  if (!chartArea) {
                      return;
                  }
                      return getGradient(ctx, chartArea, 'rgba(221, 0, 240, 0.3)', 'rgba(221, 0, 240, 0.1)');
              },
              borderColor: [
                  'rgba(83, 169, 255, 0.2)'
              ],
              pointRadius: 0,
              borderWidth: 2,
              borderDash: [5,5],
              cubicInterpolationMode: 'monotone',
              fill: true,
              tension: 0.4,

              addData: [
                  {
                      label: '???????????????????? ???????????????????? ????????????',
                      data: amountDeals,
                      valueColor: '#12921E',
                  },
              ],

              hideLabel: true,
              valueColor: '#001FF0',
              valueAfter: '%',
              
          },
      ]
  };

  chartFunc({
      id: '#deposit-chart',
      data: data,
      hideLabels: true,
      //multipleData: true,
      layout: {
          padding: {
              left: 15,
          }
      },

  })


  
}

if(document.querySelector('#profit-chart')) {
  function randomInteger(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
  }

  function repeatData() {
      let dataResult = [], labelsResult = [];

      for(let count = 0; count < 30; count++) {
          labelsResult.push(count);
      }

      for(let count = 0; count < 31; count++) {
          dataResult.push(randomInteger(1, 30));
      }

      return {
          data: dataResult,
          labels: labelsResult,
      }
  }

  const data = {
      labels: repeatData().labels,
      datasets: [
          {
              label: 'Bar-green',
              data: [0,75,50,0,90,40,0,20,20,90,0,50,30,0,90,40,0,20,20,90,0,50,30,0,90,40,0,20,20,90,0,50,30,0,90,40,0,20,20,90,0,50,30,0,90,40,0,20,20,90,0,50,30,0,90,40,0,20,20,90,20],
              backgroundColor: '#449C62',
              borderRadius: 2,
              categoryPercentage: 1,
              borderSkipped: false,
          },
          {
              label: 'Bar-red',
              data: [-100,0,0,-30,0,0,-10,0,0,0,-50,0,0,-30,0,0,-10,0,0,0,-50,0,0,-30,0,0,-10,0,0,0,-50,0,0,-30,0,0,-10,0,0,0,-50,0,0,-30,0,0,-10,0,0,0,-50,0,0,-30,0,0,-10,0,0,0,0],
              backgroundColor: 'rgb(202, 57, 12)',
              borderRadius: 2,
              categoryPercentage: 1,
              borderSkipped: false,
          },
      ]
  };
  
  barChart({
      id: '#profit-chart',
      data: data,
      hideLabels: true,
      layout: {
          padding: {
              left: 15,
          }
      }
  })
  
}

counstructBarChart({
  id: '#bar-chart',
  chartId: 'deposit-chart',

  data: [
  [100,0], [0,50], [75,0], [15,0], [0,-10], [0,-20], [5,0], [20,0], [30,0], [0,-20],
  [50,0], [0,50], [75,0], [15,0], [0,-10], [0,-20], [5,0], [20,0], [30,0], [0,-20],
  [50,0], [0,50], [75,0], [15,0], [0,-10], [0,-20], [5,0], [20,0], [30,0], [0,-20]],

  title: '????????????',
})

body.classList.add('_dark-theme-change');

// js-ad-aside-close

if(document.querySelector('.js-ad-aside-close')){
  document.querySelector('.js-ad-aside-close').addEventListener('click', function(event){
    event.preventDefault();
    const wrapp = document.querySelector('main.main');
    wrapp.classList.add('ad-aside-hidden')
    setTimeout(() => {
      wrapp.classList.add('ad-aside-is-hidden')
    }, 400)
  }, false)
}

/* glightbox */

const lightbox = GLightbox({
	openEffect: 'fade',
	closeEffect: 'fade',
	videosWidth: 1440,
});


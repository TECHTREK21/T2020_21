function triggerColor() {
  $(function () {
    'use strict'

    var ticksStyle = {
      fontColor: '#495057',
      fontStyle: 'bold'
    }

    function graphClickEvent(event, array) {
      console.log(array[0]._index);

      var indexNo = array[0]._index;

      switch (indexNo) {
        case 0:
          document.getElementById("bar-label").innerHTML = "Ischemic Heart Disease: ";
          document.getElementById("bar-text").innerHTML = "It's the term given to heart problems caused by narrowed heart arteries. When arteries are narrowed, less blood and oxygen reaches the heart muscle. This is also called coronary artery disease and coronary heart disease. This can ultimately lead to heart attack. Ischemia often causes chest pain or discomfort known as angina pectoris.";
          break;
        case 1:
          document.getElementById("bar-label").innerHTML = "Lower Respiratory Infection: ";
          document.getElementById("bar-text").innerHTML = "Lower respiratory tract infections are any infections in the lungs or below the voice box. These include pneumonia, bronchitis, and tuberculosis. A lower respiratory tract infection can affect the airways, such as with bronchitis, or the air sacs at the end of the airways, as in the case of pneumonia.";
          break;
        case 2:
          document.getElementById("bar-label").innerHTML = "Diabetes: ";
          document.getElementById("bar-text").innerHTML = "Diabetes is a disease that occurs when your blood glucose, also called blood sugar, is too high. Blood glucose is your main source of energy and comes from the food you eat. Insulin, a hormone made by the pancreas, helps glucose from food get into your cells to be used for energy. Sometimes your body doesn’t make enough—or any—insulin or doesn’t use insulin well. Glucose then stays in your blood and doesn’t reach your cells. Over time, having too much glucose in your blood can cause health problems. Although diabetes has no cure, you can take steps to manage your diabetes and stay healthy.";
          break;
        case 3:
          document.getElementById("bar-label").innerHTML = "Lung Cancer: ";
          document.getElementById("bar-text").innerHTML = "Lung cancer is the uncontrolled growth of abnormal cells in one or both lungs. These abnormal cells do not carry out the functions of normal lung cells and do not develop into healthy lung tissue. As they grow, the abnormal cells can form tumors and interfere with the functioning of the lung, which provides oxygen to the body via the blood.";
          break;
        case 4:
          document.getElementById("bar-label").innerHTML = "Stroke: ";
          document.getElementById("bar-text").innerHTML = "Stroke is a disease that affects the arteries leading to and within the brain. It is the No. 5 cause of death and a leading cause of disability in the United States. A stroke occurs when a blood vessel that carries oxygen and nutrients to the brain is either blocked by a clot or bursts (or ruptures). When that happens, part of the brain cannot get the blood (and oxygen) it needs, so it and brain cells die.";
          break;
        case 5:
          document.getElementById("bar-label").innerHTML = "Colorectal Cancer: ";
          document.getElementById("bar-text").innerHTML = "Colorectal cancer is a cancer that starts in the colon or the rectum. These cancers can also be named colon cancer or rectal cancer, depending on where they start. Colon cancer and rectal cancer are often grouped together because they have many features in common.";
          break;
        case 6:
          document.getElementById("bar-label").innerHTML = "Alzheimer's Disease: ";
          document.getElementById("bar-text").innerHTML = "Alzheimer’s disease is an irreversible, progressive brain disorder that slowly destroys memory and thinking skills and, eventually, the ability to carry out the simplest tasks. In most people with the disease—those with the late-onset type—symptoms first appear in their mid-60s. Early-onset Alzheimer’s occurs between a person’s 30s and mid-60s and is very rare. Alzheimer’s disease is the most common cause of dementia among older adults.";
          break;
        case 7:
          document.getElementById("bar-label").innerHTML = "Liver Cancer: ";
          document.getElementById("bar-text").innerHTML = "Liver cancer is cancer that starts in the liver. Some cancers develop outside the liver and spread to the organ, but doctors only describe cancer that starts in the liver as liver cancer. The liver sits below the right lung, just under the ribcage. It is one of the largest organs of the human body and has many essential functions, including removing toxins from the body.";
          break;
        case 8:
          document.getElementById("bar-label").innerHTML = "Chronic Kidney Disease: ";
          document.getElementById("bar-text").innerHTML = "Chronic kidney disease (CKD) means your kidneys are damaged and can’t filter blood the way they should. The disease is called “chronic” because the damage to your kidneys happens slowly over a long period of time. This damage can cause wastes to build up in your body. CKD can also cause other health problems.";
          break;
        case 9:
          document.getElementById("bar-label").innerHTML = "Hypertensive Heart Disease: ";
          document.getElementById("bar-text").innerHTML = "Hypertensive heart disease refers to heart conditions caused by high blood pressure. The heart working under increased pressure causes some different heart disorders. Hypertensive heart disease includes heart failure, thickening of the heart muscle, coronary artery disease, and other conditions. Hypertensive heart disease can cause serious health problems. It’s the leading cause of death from high blood pressure.";
          break;
      }
    }

    var mode = 'index'
    var intersect = true

    var diabetes = document.getElementById("risk1").innerHTML;
    var heart = document.getElementById("risk2").innerHTML;
    var stroke = document.getElementById("risk3").innerHTML;
    var lung = document.getElementById("risk4").innerHTML;

    if (lung == "Lung Cancer") {
      lung = '#ff0000';
    }
    else {
      lung = '#007bff';
    }

    if (stroke == "Stroke") {
      stroke = '#ff0000';
    }
    else {
      stroke = '#007bff';
    }

    if (heart == "Ischemic Heart Disease") {
      heart = '#ff0000';
    }
    else {
      heart = '#007bff';
    }

    if (diabetes == "Diabetes") {
      diabetes = '#ff0000';
    }
    else {
      diabetes = '#007bff';
    }


    // var $totalDeathChart = $('#total-death-chart')
    var ctx = document.getElementById('total-death-chart').getContext('2d');
    window.totalDeathChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: ["Ischemic Heart Disease", "Lower Respiratory Infection", "Diabetes", "Lung Cancer", "Stroke",
          "Colorectal Cancer", "Alzheimers Disease", "Liver Cancer", "Chronic Kidney Disease", "Hypertensive Heart Disease"],
        datasets: [
          {
            backgroundColor: [heart, '#007bff', diabetes, lung, stroke, '#007bff', '#007bff', '#007bff', '#007bff', '#007bff'],
            borderColor: ['#007bff', '#007bff', '#007bff', '#007bff', '#007bff', '#007bff', '#007bff', '#007bff', '#007bff', '#007bff'],
            data: [877.2, 598.9, 402.4, 353.8, 332.3, 239.4, 219.4, 172.2, 161.0, 160.6]
          }
          // ,
          // {
          //   backgroundColor: '#ced4da',
          //   borderColor    : '#ced4da',
          //   data           : [1012.3, 244.9, 580.5, 583.6, 455, 283.8, 311.7, 143.6, 146.6, 86.1],
          //   label          : 'Global Average'
          // }
        ]
      },
      options: {
        onClick: graphClickEvent,
        maintainAspectRatio: true, // set this to false if we want to define the graph size.
        tooltips: {
          mode: mode,
          intersect: intersect
        },
        hover: {
          mode: mode,
          intersect: intersect
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Diseases'
            },
            display: true,
            gridLines: {
              display: true,
              lineWidth: '4px',
              color: 'rgba(0, 0, 0, .2)',
              zeroLineColor: 'transparent'
            },
            ticks: $.extend({
              beginAtZero: true,

              callback: function (value, index, values) {
                return value
              }
            }, ticksStyle)
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Age-standardized rate per 100,000'
            },
            display: true,
            gridLines: {
              display: false
            },
            ticks: ticksStyle
          }]
        }
      }
    })
  })

  if(window.totalDeathChart && window.totalDeathChart !== null){
    window.totalDeathChart.destroy();
  }
}
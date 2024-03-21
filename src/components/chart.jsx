import React , {useEffect,useRef} from 'react'
import Charts from 'chart.js/auto'
import './chart.css'


const chart = ({pietotalInterest,loanAmount,loanTerm}) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    useEffect(() => {
            
            const myChartRef = chartRef.current.getContext('2d');

            chartInstance.current = new Charts(myChartRef, {
                type: "pie",
                data:{
                    labels:['Total Payments','Total Interest'],
                    datasets: [
                        {
                            data: [loanAmount,pietotalInterest],
                            backgroundColor:[
                                'rgb(255,99,132)',
                                'rgb(54,162,235)'
                            ],
                        }
                    ]
                }
            })
            return () =>{
                if(chartInstance.current){
                    chartInstance.current.destroy()
                }
            }
    }, [loanAmount,pietotalInterest])

    const totalMonthlyPayment = (parseFloat(loanAmount) + parseFloat(pietotalInterest)).toFixed(2);
    const averageMonthlyPay = ((totalMonthlyPayment / 12) / loanTerm).toFixed(2);
    const totalMonths = loanTerm * 12;
    return (
    <div className='pieChart'>
        <canvas ref={chartRef} style={{width:'300px', height:'300px'}}/>
        <div className="output">
            <p>Monthly Pay: {averageMonthlyPay}</p>
            <p>Total of {totalMonths} monthly Payemnts: {totalMonthlyPayment}</p>
            <p>Total interest: {pietotalInterest}</p>
        </div>
    </div>
  )
}

export default chart

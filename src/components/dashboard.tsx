import { Flex, Text, Card, CardBody, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useValidation } from "@/_hooks/useValidate";
import { getAllCalls } from "@/_services/admin.service";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import moment from "moment";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
moment.updateLocale('pt', {
    months: [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ]
});

export default function Dashboard() {

    const sysValidation = useValidation()
    const [apiCallsValue, setApiCallsValue] = useState<number>(0)
    const [apiCalls, setApiCalls] = useState<number>(0)
    const [mediaTime, setMediaTime] = useState<number>(0)
    const [allData, setAllData] = useState<any>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const refreshData = async () => {
        setIsLoading(true)
        await sysValidation(async (token: string) => {
            const { status, response } = await getAllCalls()
            if (status === 200) {
                const total = response.reduce((prev: any, item: any) => {
                    return prev + parseFloat(item.value)
                }, 0)
                const totalTime = response.reduce((prev: any, item: any) => {
                    return prev + parseFloat(item.time)
                }, 0)
                setMediaTime(totalTime / response.length)
                setApiCallsValue(total)
                setApiCalls(response.length)
                setAllData(response)
            }
        })
        setIsLoading(false)
    }

    const ShowCard = (title: any, body: any, width='auto') => {
        return (
            <Card height="auto" width={width} minWidth="20%">
                <Flex pl={4} pr={4} pt={4}>
                    {title}
                </Flex>
                <CardBody mt={-3}>
                    <Flex justifyContent="left" alignItems="center">
                        {isLoading ? <Spinner /> : body}
                    </Flex>
                </CardBody>
            </Card>
        )

    }

    useEffect(() => {
        refreshData()
    }, [])

    const options = {
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    };
    const labels = [moment().locale('pt').format('MMMM')];
    const data = {
        labels,
        datasets: [
            {
                label: 'CND',
                data: [allData.filter((item: any) => item.service === 'cnd' || item.service === 'sefaz').length],
                backgroundColor: 'rgba(50, 73, 255)',
            },
            {
                label: 'CNDT',
                data: [allData.filter((item: any) => item.service === 'cndt').length],
                backgroundColor: 'rgba(75, 73, 255)',
            },
            {
                label: 'FGTS',
                data: [allData.filter((item: any) => item.service === 'fgts').length],
                backgroundColor: 'rgba(100, 73, 255)',
            },
            {
                label: 'SINTEGRA',
                data: [allData.filter((item: any) => item.service === 'sintegra').length],
                backgroundColor: 'rgba(125, 73, 255)',
            },
        ],
    };
    return (
        <Flex bg="gray.100" width="100%" direction="column" p={10} pt={4}>
            <Flex direction="row" padding={4} gap={4} width="100%" justifyContent="center">
                {ShowCard(<Text fontSize="18px">Gastos Infosimples</Text>, `R$ ${apiCallsValue.toFixed(2)}`)}
                {ShowCard(<Text fontSize="18px">Chamadas Infosimples</Text>, `${apiCalls}`)}
                {ShowCard(<Text fontSize="18px">Tempo médio de resposta</Text>, `${(mediaTime / 1000).toFixed(2)} segundos`)}
            </Flex>
            <Flex>
                {ShowCard('Certidões por tipo', <Bar options={options} data={data} />, '40%')}
                
            </Flex>
        </Flex>


    )
}

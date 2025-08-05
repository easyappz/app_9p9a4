import React, { useState, useEffect } from 'react';
import { Button, Input, Card, List, Typography, Layout, Space, Divider } from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@tanstack/react-query';
import { saveCalculation, getCalculationHistory } from '../api/calculatorApi';

const { Content } = Layout;
const { Text } = Typography;

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);

  // Fetch calculation history
  const { data: history, isLoading, refetch } = useQuery(
    ['calculationHistory'],
    getCalculationHistory,
    {
      staleTime: 60000, // Cache for 1 minute
    }
  );

  // Mutation for saving calculation
  const saveCalculationMutation = useMutation(saveCalculation, {
    onSuccess: () => {
      refetch(); // Refresh history after saving
    },
    onError: (error) => {
      console.error('Error saving calculation:', error);
    },
  });

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        // eslint-disable-next-line no-eval
        const evalResult = eval(expression);
        setResult(evalResult);
        if (expression && evalResult !== undefined) {
          saveCalculationMutation.mutate({ expression, result: evalResult });
        }
      } catch (error) {
        setResult('Ошибка');
      }
    } else if (value === 'C') {
      setExpression('');
      setResult(null);
    } else {
      setExpression((prev) => prev + value);
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <Card
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CalculatorOutlined style={{ marginRight: '8px' }} />
              Калькулятор
            </div>
          }
          style={{ width: 400, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}
        >
          <Input
            value={expression}
            placeholder="Введите выражение"
            disabled
            style={{ marginBottom: '16px', textAlign: 'right', fontSize: '18px', padding: '10px' }}
          />
          {result !== null && (
            <Text style={{ display: 'block', textAlign: 'right', fontSize: '24px', marginBottom: '16px' }}>
              Результат: {result}
            </Text>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
            {buttons.map((btn) => (
              <Button
                key={btn}
                onClick={() => handleButtonClick(btn)}
                style={{
                  height: '50px',
                  fontSize: '18px',
                  backgroundColor: btn === '=' ? '#1890ff' : btn === 'C' ? '#ff4d4f' : '',
                  color: btn === '=' || btn === 'C' ? '#fff' : '',
                  border: 'none',
                  borderRadius: '4px',
                }}
              >
                {btn}
              </Button>
            ))}
          </div>
          <Divider>История вычислений</Divider>
          <List
            loading={isLoading}
            dataSource={history || []}
            renderItem={(item) => (
              <List.Item>
                <Text>{`${item.expression} = ${item.result}`}</Text>
              </List.Item>
            )}
            style={{ maxHeight: '200px', overflowY: 'auto' }}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default Calculator;

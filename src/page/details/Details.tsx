import { Col, Row } from 'antd';
import React from 'react';
import { LineBar } from './Linebar';
import { PieChart } from './PieChart';
import { StackedBar } from './StackedBar';
import { VerticalBar } from './VerticalBar';

export default function DetailPage() {
    return (
        <>
            <Row>
                <Col span={12} style={{ padding: '12px' }}>
                    <VerticalBar />
                </Col>
                <Col span={12} style={{ padding: '12px' }}>
                    <StackedBar />
                </Col>
            </Row>
            <Row>
                <Col span={3} />
                <Col span={6} style={{ padding: '12px' }}>
                    <PieChart />
                </Col>
                <Col span={3} />
                <Col span={12} style={{ padding: '12px' }}>
                    <LineBar />
                </Col>
            </Row>
        </>
    );
}

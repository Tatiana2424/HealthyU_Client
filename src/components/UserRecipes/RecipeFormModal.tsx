import React from 'react';
import { Modal, Form, Input, InputNumber, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const RecipeFormModal: React.FC<{
    isVisible: boolean;
    onCancel: () => void;
    onSubmit: (values: any) => void;
}> = ({ isVisible, onCancel, onSubmit }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            title="Recipe Details"
            visible={isVisible}
            bodyStyle={{ overflowY: 'auto', maxHeight: '500px'}}
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then(async (values) => {
                        console.log(values);
                        //form.resetFields();
                        onSubmit(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form form={form} layout="vertical" name="form_in_modal">
                <Form.Item
                    name="name"
                    label="Recipe Name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item name="videoUrl" label="Video URL">
                    <Input />
                </Form.Item>
                <Form.Item name={['image', 'url']} label="Image URL">
                    <Input />
                </Form.Item>
                <Form.Item label="Nutrition Information">
                    <Input.Group compact>
                        <Form.Item
                            name={['recipeNutrition', 'calories']}
                            label="Calories"
                            style={{
                                display: 'inline-block',
                                width: 'calc(20% - 8px)',
                            }}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            name={['recipeNutrition', 'protein']}
                            label="Protein (g)"
                            style={{
                                display: 'inline-block',
                                width: 'calc(20% - 8px)',
                                margin: '0 8px',
                            }}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            name={['recipeNutrition', 'fat']}
                            label="Fat (g)"
                            style={{
                                display: 'inline-block',
                                width: 'calc(20% - 8px)',
                            }}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            name={['recipeNutrition', 'carbohydrates']}
                            label="Carbs (g)"
                            style={{
                                display: 'inline-block',
                                width: 'calc(20% - 8px)',
                                margin: '0 8px',
                            }}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            name={['recipeNutrition', 'fiber']}
                            label="Fiber (g)"
                            style={{
                                display: 'inline-block',
                                width: 'calc(20% - 8px)',
                            }}
                        >
                            <InputNumber />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
                <Form.List name="ingredients">
                    {(fields, { add, remove }) => (
                        <>
                            <label>Ingredients</label>
                            {fields.map(
                                ({ key, name, fieldKey, ...restField }) => (
                                    <Space
                                        key={key}
                                        style={{
                                            display: 'flex',
                                            marginBottom: 8,
                                        }}
                                        align="baseline"
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'name']}
                                            fieldKey={[fieldKey!, 'name']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Missing ingredient name',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Ingredient Name" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'position']}
                                            fieldKey={[fieldKey!, 'position']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing position',
                                                },
                                            ]}
                                        >
                                            <InputNumber
                                                placeholder="Position"
                                                min={1}
                                            />
                                        </Form.Item>
                                        <MinusCircleOutlined
                                            onClick={() => remove(name)}
                                        />
                                    </Space>
                                )
                            )}
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                            >
                                Add Ingredient
                            </Button>
                        </>
                    )}
                </Form.List>
                <Form.List name="instructions">
                    {(fields, { add, remove }) => (
                        <>
                            <label>Instructions</label>
                            {fields.map(
                                ({ key, name, fieldKey, ...restField }) => (
                                    <Space
                                        key={key}
                                        style={{
                                            display: 'flex',
                                            marginBottom: 8,
                                        }}
                                        align="baseline"
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'displayText']}
                                            fieldKey={[
                                                fieldKey!,
                                                'displayText',
                                            ]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Missing instruction text',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Instruction Text" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'position']}
                                            fieldKey={[fieldKey!, 'position']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing position',
                                                },
                                            ]}
                                        >
                                            <InputNumber
                                                placeholder="Position"
                                                min={1}
                                            />
                                        </Form.Item>
                                        <MinusCircleOutlined
                                            onClick={() => remove(name)}
                                        />
                                    </Space>
                                )
                            )}
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                            >
                                Add Instruction
                            </Button>
                        </>
                    )}
                </Form.List>
                <Form.List name="recipeSearchKeywords">
                    {(fields, { add, remove }) => (
                        <>
                            <label>Keywords</label>
                            {fields.map(
                                ({ key, name, fieldKey, ...restField }) => (
                                    <Space
                                        key={key}
                                        style={{
                                            display: 'flex',
                                            marginBottom: 8,
                                        }}
                                        align="baseline"
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'keyword']}
                                            fieldKey={[fieldKey!, 'keyword']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing keyword',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Keyword" />
                                        </Form.Item>
                                        <MinusCircleOutlined
                                            onClick={() => remove(name)}
                                        />
                                    </Space>
                                )
                            )}
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                            >
                                Add Keyword
                            </Button>
                        </>
                    )}
                </Form.List>
                <div className="recipe-time-info-section">
                    <h3>Time Information</h3>
                    <Form.Item
                        name={['timeInfo', 'prepTime']}
                        label="Preparation Time (minutes)"
                        rules={[
                            {
                                required: true,
                                message: 'Please input preparation time!',
                            },
                        ]}
                    >
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name={['timeInfo', 'cookTime']}
                        label="Cook Time (minutes)"
                        rules={[
                            {
                                required: true,
                                message: 'Please input cook time!',
                            },
                        ]}
                    >
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name={['timeInfo', 'totalTime']}
                        label="Total Time (minutes)"
                        rules={[
                            {
                                required: true,
                                message: 'Please input total time!',
                            },
                        ]}
                    >
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name={['timeInfo', 'servings']}
                        label="Servings"
                        rules={[
                            {
                                required: true,
                                message: 'Please input number of servings!',
                            },
                        ]}
                    >
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name={['timeInfo', 'restTime']}
                        label="Rest Time (minutes)"
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name={['timeInfo', 'coolTime']}
                        label="Cool Time (minutes)"
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};

export default RecipeFormModal;

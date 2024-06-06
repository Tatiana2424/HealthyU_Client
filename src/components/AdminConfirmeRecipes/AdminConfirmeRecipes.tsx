import React, { useState, useEffect } from 'react';
import {
    Button,
    Modal,
    Input,
    Form,
    Spin,
    message,
    InputNumber,
    Checkbox,
    Space,
} from 'antd';
import axios from 'axios';
import {
    Recipe,
    RecipeIngredient,
    RecipeInstruction,
    RecipeNutrition,
    RecipeSearchKeyword,
    RecipeTimeInfo,
} from '../../models/Recipe';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface Props {
    userId: string | null;
}

export interface RecipeEntry {
    id: number;
    image: {
        url: string;
    };
    name: string;
    description: string;
    userId?: string | null;
    isPublished: boolean;
    videoUrl: string;
    recipeNutrition: RecipeNutrition;
    ingredients: RecipeIngredient[];
    instructions: RecipeInstruction[];
    timeInfo?: RecipeTimeInfo;
    recipeSearchKeywords: RecipeSearchKeyword[];
}

const AdminConfirmeRecipes: React.FC<Props> = ({ userId }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentRecipe, setCurrentRecipe] = useState<Recipe | undefined>();
    const [form] = Form.useForm();
    const [recipeOperation, setRecipeOperation] = useState(0);

    useEffect(() => {
        const fetchRecipes = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get<Recipe[]>(
                    `https://localhost:7271/api/recipe/GetUnpublishedRecipes`
                );
                console.log(response.data);
                setRecipes(response.data);
            } catch (error) {
                console.error('Failed to fetch recipes', error);
            }
            setIsLoading(false);
        };

        fetchRecipes();
    }, [userId, recipeOperation]);

    const showModal = (recipe?: Recipe) => {
        setCurrentRecipe(recipe);
        form.setFieldsValue(
            recipe
                ? recipe
                : {
                      ingredients: [{ name: '' }],
                      instructions: [{ displayText: '' }],
                  }
        );
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            console.log(currentRecipe?.id);
            if (currentRecipe) {
                await axios.put(
                    `https://localhost:7271/api/recipe/Publish/${
                        currentRecipe.id
                    }?isPublish=${true}`
                );
                message.success('Recipe published successfully');
            }
            message.success('Recipe published successfully');
        } catch (error) {
            console.error('Failed to publish the recipe', error);
            message.error('Failed to publish the recipe');
        }

        setIsModalVisible(false);
        form.resetFields();
        // form.resetFields(); // Clear form fields after submission
        setRecipeOperation((prev) => prev + 1); // Refresh the recipes list
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    if (isLoading) {
        return <Spin />;
    }

    return (
        <>
            {recipes.map((recipe) => (
                <div className="new-user-item" key={recipe.id}>
                    <h3>{recipe.name}</h3>
                    <p>{recipe.description}</p>
                    <span className="edit-button">
                        <button onClick={() => showModal(recipe)}>
                            See Recipe Detailse
                        </button>
                    </span>
                    <span className="delete-button">
                        <button onClick={handleOk}>Publish Recipe</button>
                    </span>
                </div>
            ))}
            <Modal
                title="Recipe Details"
                visible={isModalVisible}
                bodyStyle={{ overflowY: 'auto', maxHeight: '500px' }}
                onCancel={handleCancel}
                onOk={handleOk}
                okText="Publish Recipe"
            >
                <Form form={form} layout="vertical" name="form_in_modal">
                    <Form.Item
                        name="name"
                        label="Recipe Name"
                        rules={[{ required: true }]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea rows={4} disabled />
                    </Form.Item>
                    <Form.Item name="videoUrl" label="Video URL">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item name={['image', 'url']} label="Image URL">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item label="Nutrition Information">
                        <Input.Group compact >
                            <Form.Item
                                name={['recipeNutrition', 'calories']}
                                label="Calories"
                                style={{
                                    display: 'inline-block',
                                    width: 'calc(20% - 8px)',
                                }}
                            >
                                <InputNumber disabled/>
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
                                <InputNumber disabled/>
                            </Form.Item>
                            <Form.Item
                                name={['recipeNutrition', 'fat']}
                                label="Fat (g)"
                                style={{
                                    display: 'inline-block',
                                    width: 'calc(20% - 8px)',
                                }}
                            >
                                <InputNumber disabled/>
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
                                <InputNumber disabled/>
                            </Form.Item>
                            <Form.Item
                                name={['recipeNutrition', 'fiber']}
                                label="Fiber (g)"
                                style={{
                                    display: 'inline-block',
                                    width: 'calc(20% - 8px)',
                                }}
                            >
                                <InputNumber disabled/>
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
                                                <Input placeholder="Ingredient Name" disabled/>
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'position']}
                                                fieldKey={[
                                                    fieldKey!,
                                                    'position',
                                                ]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Missing position',
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    placeholder="Position"
                                                    min={1}
                                                    disabled
                                                />
                                            </Form.Item>
                                        </Space>
                                    )
                                )}
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
                                                <Input placeholder="Instruction Text" disabled/>
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'position']}
                                                fieldKey={[
                                                    fieldKey!,
                                                    'position',
                                                ]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Missing position',
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    placeholder="Position"
                                                    min={1}
                                                    disabled
                                                />
                                            </Form.Item>         
                                        </Space>
                                    )
                                )}
                            </>
                        )}
                    </Form.List>
                    <Form.List name="searchKeywords">
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
                                                fieldKey={[
                                                    fieldKey!,
                                                    'keyword',
                                                ]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Missing keyword',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Keyword" disabled/>
                                            </Form.Item>
                                        </Space>
                                    )
                                )}
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
                            <InputNumber min={1} style={{ width: '100%' }} disabled/>
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
                            <InputNumber min={1} style={{ width: '100%' }} disabled/>
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
                            <InputNumber min={1} style={{ width: '100%' }} disabled/>
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
                            <InputNumber min={1} style={{ width: '100%' }} disabled/>
                        </Form.Item>

                        <Form.Item
                            name={['timeInfo', 'restTime']}
                            label="Rest Time (minutes)"
                        >
                            <InputNumber min={0} style={{ width: '100%' }} disabled/>
                        </Form.Item>

                        <Form.Item
                            name={['timeInfo', 'coolTime']}
                            label="Cool Time (minutes)"
                        >
                            <InputNumber min={0} style={{ width: '100%' }} disabled/>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default AdminConfirmeRecipes;

import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Input,
  Form,
  Spin,
  message,
  InputNumber,
  Space,
} from "antd";
import axios from "axios";
import {
  Recipe,
  RecipeIngredient,
  RecipeInstruction,
  RecipeNutrition,
  RecipeSearchKeyword,
  RecipeTimeInfo,
} from "../../models/Recipe";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import apiService from "../../api/apiService";

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

const UserRecipes: React.FC<Props> = ({ userId }) => {
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
        const response = await apiService.get<Recipe[]>(
          `/recipe/GetByUserId/${userId}`
        );
        setRecipes(response);
      } catch (error) {
        console.error("Failed to fetch recipes", error);
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
            ingredients: [{ name: "" }],
            instructions: [{ displayText: "" }],
          }
    );
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    await form.validateFields();
    const formValues = form.getFieldsValue();
    const ingredients = formValues.ingredients.map(
      (ingredient: { name: any; position: any }, index: number) => ({
        id: currentRecipe?.ingredients?.[index]?.id || 0,
        name: ingredient.name,
        position: ingredient.position,
      })
    );

    const instructions = formValues.instructions.map(
      (
        instruction: { displayText: string; position: number },
        index: number
      ) => ({
        id: currentRecipe?.instructions?.[index]?.id || 0,
        displayText: instruction.displayText,
        position: instruction.position,
      })
    );

    const recipeData: Recipe = {
      userId: Number(userId),
      id: currentRecipe ? Number(currentRecipe.id) : 0,
      name: formValues.name,
      description: formValues.description,
      videoUrl: formValues.videoUrl,
      image: {
        url: formValues.image.url,
        id: currentRecipe?.imageId || 0,
      },
      isPublished: false,
      recipeNutrition: {
        id: currentRecipe?.recipeNutrition?.id || 0,
        calories: formValues.recipeNutrition.calories,
        protein: formValues.recipeNutrition.protein,
        fat: formValues.recipeNutrition.fat,
        carbohydrates: formValues.recipeNutrition.carbohydrates,
        fiber: formValues.recipeNutrition.fiber,
      },
      timeInfo: {
        id: currentRecipe?.timeInfo?.id || 0,
        prepTime: formValues.timeInfo.prepTime.toString(),
        cookTime: formValues.timeInfo.cookTime.toString(),
        totalTime: formValues.timeInfo.totalTime.toString(),
        servings: formValues.timeInfo.servings,
        restTime: formValues.timeInfo.restTime.toString() || "",
        coolTime: formValues.timeInfo.coolTime.toString() || "",
      },
      ingredients: ingredients,
      instructions: instructions,
      searchKeywords: formValues.searchKeywords.map(
        (keyword: { id: any; keyword: any }) => ({
          id: keyword.id || 0,
          keyword: keyword.keyword,
        })
      ),
    };

    try {
      if (currentRecipe) {
        await axios.put(
          `https://localhost:7271/api/recipe/Update/${currentRecipe.id}`,
          recipeData
        );
        message.success("Recipe updated successfully");
      } else {
        await axios.post(
          "https://localhost:7271/api/recipe/Create/",
          recipeData
        );
        message.success("Recipe added successfully");
      }
    } catch (error) {
      console.error("Failed to save the recipe", error);
      message.error("Failed to save the recipe");
    }

    setIsModalVisible(false);
    form.resetFields();
    setRecipeOperation((prev) => prev + 1);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const deleteRecipe = async (id: number) => {
    console.log(id);
    try {
      await axios.delete(`https://localhost:7271/api/recipe/Delete/${id}`);
      console.log(id);
      message.success("Recipe deleted successfully");
      setRecipeOperation((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to delete the recipe", error);
      message.error("Failed to delete the recipe");
    }
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <>
      <div className="add-button">
        <button onClick={() => showModal()}>Add New Recipe</button>
      </div>
      {recipes.map((recipe) => (
        <div className="new-user-item" key={recipe.id}>
          <h3>{recipe.name}</h3>
          <p>{recipe.description}</p>
          <span className="edit-button">
            <button onClick={() => showModal(recipe)}>Edit</button>
          </span>
          <span className="delete-button">
            <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
          </span>
        </div>
      ))}
      <Modal
        title="Recipe Details"
        visible={isModalVisible}
        bodyStyle={{ overflowY: "auto", maxHeight: "500px" }}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="name"
            label="Recipe Name"
            rules={[{ required: true }]}
          >
            <Input className="custom-input" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} className="custom-input" />
          </Form.Item>
          <Form.Item name="videoUrl" label="Video URL">
            <Input className="custom-input" />
          </Form.Item>
          <Form.Item name={["image", "url"]} label="Image URL">
            <Input className="custom-input" />
          </Form.Item>
          <Form.Item label="Nutrition Information">
            <Input.Group compact>
              <Form.Item
                name={["recipeNutrition", "calories"]}
                label="Calories"
                style={{
                  display: "inline-block",
                  width: "calc(20% - 8px)",
                }}
              >
                <InputNumber className="custom-input" />
              </Form.Item>
              <Form.Item
                name={["recipeNutrition", "protein"]}
                label="Protein (g)"
                style={{
                  display: "inline-block",
                  width: "calc(20% - 8px)",
                  margin: "0 8px",
                }}
              >
                <InputNumber className="custom-input" />
              </Form.Item>
              <Form.Item
                name={["recipeNutrition", "fat"]}
                label="Fat (g)"
                style={{
                  display: "inline-block",
                  width: "calc(20% - 8px)",
                }}
              >
                <InputNumber className="custom-input" />
              </Form.Item>
              <Form.Item
                name={["recipeNutrition", "carbohydrates"]}
                label="Carbs (g)"
                style={{
                  display: "inline-block",
                  width: "calc(20% - 8px)",
                  margin: "0 8px",
                }}
              >
                <InputNumber className="custom-input" />
              </Form.Item>
              <Form.Item
                name={["recipeNutrition", "fiber"]}
                label="Fiber (g)"
                style={{
                  display: "inline-block",
                  width: "calc(20% - 8px)",
                }}
              >
                <InputNumber className="custom-input" />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.List name="ingredients">
            {(fields, { add, remove }) => (
              <>
                <label>Ingredients</label>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      fieldKey={[fieldKey!, "name"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing ingredient name",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Ingredient Name"
                        className="custom-input"
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "position"]}
                      fieldKey={[fieldKey!, "position"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing position",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Position"
                        min={1}
                        className="custom-input"
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
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
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "displayText"]}
                      fieldKey={[fieldKey!, "displayText"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing instruction text",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Instruction Text"
                        className="custom-input"
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "position"]}
                      fieldKey={[fieldKey!, "position"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing position",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Position"
                        min={1}
                        className="custom-input"
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
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
          <Form.List name="searchKeywords">
            {(fields, { add, remove }) => (
              <>
                <label>Keywords</label>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "keyword"]}
                      fieldKey={[fieldKey!, "keyword"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing keyword",
                        },
                      ]}
                    >
                      <Input placeholder="Keyword" className="custom-input" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
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
              name={["timeInfo", "prepTime"]}
              label="Preparation Time (minutes)"
              rules={[
                {
                  required: true,
                  message: "Please input preparation time!",
                },
              ]}
            >
              <InputNumber
                min={1}
                style={{ width: "100%" }}
                className="custom-input"
              />
            </Form.Item>

            <Form.Item
              name={["timeInfo", "cookTime"]}
              label="Cook Time (minutes)"
              rules={[
                {
                  required: true,
                  message: "Please input cook time!",
                },
              ]}
            >
              <InputNumber
                min={1}
                style={{ width: "100%" }}
                className="custom-input"
              />
            </Form.Item>

            <Form.Item
              name={["timeInfo", "totalTime"]}
              label="Total Time (minutes)"
              rules={[
                {
                  required: true,
                  message: "Please input total time!",
                },
              ]}
            >
              <InputNumber
                min={1}
                style={{ width: "100%" }}
                className="custom-input"
              />
            </Form.Item>

            <Form.Item
              name={["timeInfo", "servings"]}
              label="Servings"
              rules={[
                {
                  required: true,
                  message: "Please input number of servings!",
                },
              ]}
            >
              <InputNumber
                min={1}
                style={{ width: "100%" }}
                className="custom-input"
              />
            </Form.Item>

            <Form.Item
              name={["timeInfo", "restTime"]}
              label="Rest Time (minutes)"
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                className="custom-input"
              />
            </Form.Item>

            <Form.Item
              name={["timeInfo", "coolTime"]}
              label="Cool Time (minutes)"
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                className="custom-input"
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default UserRecipes;

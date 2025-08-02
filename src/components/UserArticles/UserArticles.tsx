import React, { useState, useEffect } from "react";
import { Modal, Input, Form, Spin, message } from "antd";
import axios from "axios";
import { BlogEntry } from "../BlogComponent/BlogComponent";
import "./UserArticles.scss";
import "react-quill/dist/quill.snow.css";
import MyEditor from "../MyEditor/MyEditor";
import { createArticle } from "../../api/apiService";

interface Props {
  userId: string | null;
}

export interface ArticleEntry {
  id: number;
  image: {
    url: string;
  };
  title: string;
  description: string;
  articleText: string;
  userId?: string | null;
}

const UserArticles: React.FC<Props> = ({ userId }) => {
  const [articles, setArticles] = useState<BlogEntry[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentArticle, setCurrentArticle] = useState<BlogEntry | undefined>(
    undefined
  );
  const [form] = Form.useForm();
  const [articleOperation, setArticleOperation] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<BlogEntry[]>(
          `https://localhost:7271/api/article/GetByUsetrId/${userId}`
        );
        setArticles(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch articles", error);
      }
      setIsLoading(false);
    };

    fetchArticles();
  }, [userId, articleOperation]);

  const showModal = (article?: BlogEntry) => {
    setCurrentArticle(article);
    form.setFieldsValue(article);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    await form.validateFields();
    const formValues = form.getFieldsValue();
    console.log(formValues.image.url);
    const articleData: ArticleEntry = {
      image: { url: formValues.image.url },
      title: formValues.title,
      description: formValues.description,
      articleText: formValues.articleText,
      id: currentArticle ? Number(currentArticle.id) : 0,
      userId: userId,
    };
    console.log(articleData);
    if (currentArticle) {
      try {
        await axios.put(
          `https://localhost:7271/api/Article/Update/${currentArticle.id}`,
          articleData
        );
        message.success("Updated article successfully", 10);
      } catch (error) {
        console.error("Failed to update article", error);
        message.error("Failed to update article", 10);
      }
    } else {
      try {
        await createArticle(articleData);
        message.success("Added article successfully", 10);
      } catch (error) {
        console.error("Failed to add article", error);
        message.error("Failed to add article", 10);
      }
    }

    setIsModalVisible(false);
    form.resetFields();
    setArticleOperation((prev) => prev + 1);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const deleteArticle = async (id: string) => {
    try {
      await axios.delete(`https://localhost:7271/api/Article/Delete/${id}`);
      message.success("Deleted article successfully", 10);
    } catch (error) {
      console.error("Failed to delete article", error);
      message.error("Failed to delete article", 10);
    }
    setArticleOperation((prev) => prev + 1);
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <>
      <div className="add-button">
        <button onClick={() => showModal()}>Add New Article</button>
      </div>
      {articles.map((article) => (
        <div className="new-user-item" key={article.id}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <span className="edit-button">
            <button onClick={() => showModal(article)}>Edit</button>
          </span>
          <span className="delete-button">
            <button onClick={() => deleteArticle(article.id)}>Delete</button>
          </span>
        </div>
      ))}
      <Modal
        title={currentArticle ? "Edit Article" : "Add Article"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{ overflowY: "auto", maxHeight: "400px" }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input the title!",
              },
            ]}
          >
            <Input className="custom-input" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input the description!",
              },
            ]}
          >
            <Input.TextArea className="custom-input" />
          </Form.Item>
          <Form.Item
            name="articleText"
            label="Article Text"
            rules={[
              {
                required: true,
                message: "Please input the article text!",
              },
            ]}
          >
            <MyEditor
              value={form.getFieldValue("articleText") || ""}
              onChange={(content) =>
                form.setFieldsValue({ articleText: content })
              }
            />
          </Form.Item>
          <Form.Item
            name={["image", "url"]}
            label="Image URL"
            rules={[
              {
                required: true,
                message: "Please input the image URL!",
              },
            ]}
          >
            <Input className="custom-input" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserArticles;

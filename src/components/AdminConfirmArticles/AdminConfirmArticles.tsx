import React, { useState, useEffect } from "react";
import { Modal, Input, Form, Spin, message } from "antd";
import axios from "axios";
import { BlogEntry } from "../BlogComponent/BlogComponent";
import "react-quill/dist/quill.snow.css";
import MyEditor from "../MyEditor/MyEditor";
import apiService from "../../api/apiService";

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

const AdminConfirmeArticles: React.FC<Props> = ({ userId }) => {
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
        const data = await apiService.get<BlogEntry[]>(
          "/article/GetUnpublishedArticles"
        );
        setArticles(data);
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
    if (currentArticle) {
      try {
        await apiService.put(
          `/Article/Publish/${currentArticle.id}?isPublish=${true}`
        );
        message.success("Published article successfully", 10);
      } catch (error) {
        message.error("Failed to publish article", 10);
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

  if (isLoading) {
    return <Spin />;
  }

  return (
    <>
      {articles.map((article) => (
        <div className="new-user-item" key={article.id}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <span className="edit-button">
            <button onClick={() => showModal(article)}>
              See Article Detailse
            </button>
          </span>
          <span className="delete-button">
            <button onClick={handleOk}>Publish Article</button>
          </span>
        </div>
      ))}
      <Modal
        title="Article Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{ overflowY: "auto", maxHeight: "400px" }}
        okText="Publish Article"
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
            <Input disabled />
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
            <Input.TextArea disabled />
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
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminConfirmeArticles;

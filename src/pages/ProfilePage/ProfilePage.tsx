import React, { useEffect, useRef, useState } from "react";
import "./ProfilePage.scss";
import Banner from "../../components/common/Banner/Banner";
import { User } from "../../models/User";
import apiService, { getUserById, updateUser } from "../../api/apiService";
import { message, Spin } from "antd";
import UserArticles from "../../components/UserArticles/UserArticles";
import UserRecipes from "../../components/UserRecipes/UserRecipes";
import AdminConfirmeRecipes from "../../components/AdminConfirmeRecipes/AdminConfirmeRecipes";
import AdminConfirmeArticles from "../../components/AdminConfirmArticles/AdminConfirmArticles";
import UserBMI from "../../components/UserBMI/UserBMI";

const ProfilePage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeSection, setActiveSection] = useState("personalInfo");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const userId = sessionStorage.getItem("userId");
  const [userData, setUserData] = useState<User>({
    id: 0,
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    imageId: 0,
    role: "",
    image: {
      title: "",
      alt: "",
      id: 0,
      url: "",
    },
  });
  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
        setUserData({
          ...userData,
          image: { ...userData.image, url: reader.result as string },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const response = await apiService.get<User>(
          `/User/GetById/${Number(userId)}`
        );
        if (response !== null) {
          setUserData(response);
          if (response.image?.url !== "null") {
            setImagePreviewUrl(response.image?.url as string);
          }
        } else {
          console.error("User data not found or failed to fetch");
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [userId]);

  const handleSaveChanges = async (event: React.FormEvent, section: string) => {
    event.preventDefault();
    try {
      await updateUser(Number(userId), userData);
      message.success("Profile updated successfully", 10);
    } catch (error) {
      console.error("Failed to update profile", error);
      message.error("Failed to update profile", 10);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "400px",
          minHeight: "600px",
        }}
      >
        <Spin size="large" />
      </div>
    );
  } else {
    return (
      <>
        <Banner
          bannerImageUrl="https://static.wixstatic.com/media/2e2a49_f5c401d329134bad82fd7bc1fed4e677~mv2.jpg/v1/fill/w_980,h_769,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2e2a49_f5c401d329134bad82fd7bc1fed4e677~mv2.jpg"
          alignment="center"
          isDarken={true}
          bannerHeight={200}
        />
        <div className="profile-page-component">
          <div className="profile-page">
            <aside className="sidebar">
              <div className="profile-management">
                <div className="user-greeting-section">
                  <div className="user-icon">
                    {imagePreviewUrl ? (
                      <img
                        src={imagePreviewUrl}
                        alt="User"
                        className="user-image"
                      />
                    ) : (
                      <svg
                        className="icon "
                        width="64"
                        height="64"
                        role="img"
                        viewBox="0 0 64 64"
                      >
                        <path fill="#0053C0" d="M0 0h64v64H0z"></path>
                        <path fill="#0053C0" d="M0 0h60v60H0z"></path>
                        <path
                          fill="#FFF"
                          transform="translate(2 2)"
                          d="M30 35c-7.51 0-22.5 3.767-22.5 11.25v5.625h45V46.25C52.5 38.74 37.51 35 30 35m0-25c-5.524 0-10 4.476-10 10s4.476 10 10 10 10-4.476 10-10-4.476-10-10-10"
                        ></path>
                      </svg>
                    )}
                  </div>
                  <div className="greeting greetingEmail">
                    <span>Hi, {userData.userName}</span>
                  </div>
                </div>
                <ul>
                  <li
                    onClick={() => setActiveSection("personalInfo")}
                    className={activeSection === "personalInfo" ? "active" : ""}
                  >
                    Personal Info
                  </li>
                  <li
                    onClick={() => setActiveSection("publicProfileSettings")}
                    className={
                      activeSection === "publicProfileSettings" ? "active" : ""
                    }
                  >
                    Public Profile Settings
                  </li>
                  <li
                    onClick={() => setActiveSection("healthCare")}
                    className={activeSection === "healthCare" ? "active" : ""}
                  >
                    Your health care info
                  </li>
                </ul>
              </div>
              <div className="profile-management">
                <ul>
                  <li
                    onClick={() => setActiveSection("addArticles")}
                    className={activeSection === "addArticles" ? "active" : ""}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      viewBox="0 0 20 20"
                      width="20"
                    >
                      <path d="m7 0a2 2 0 0 0 -2 2h9a2 2 0 0 1 2 2v12a2 2 0 0 0 2-2v-12a2 2 0 0 0 -2-2z" />
                      <path d="m13 20a2 2 0 0 0 2-2v-13a2 2 0 0 0 -2-2h-9a2 2 0 0 0 -2 2v13a2 2 0 0 0 2 2zm-4-15h4v5h-4zm-5 0h4v1h-4zm0 2h4v1h-4zm0 2h4v1h-4zm0 2h9v1h-9zm0 2h9v1h-9zm0 2h9v1h-9z" />
                    </svg>
                    Add Articles
                  </li>
                  <li
                    onClick={() => setActiveSection("addRecipes")}
                    className={activeSection === "addRecipes" ? "active" : ""}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1000 1001.0101"
                    >
                      <path d="m500 131.456c-204 0-369 165-369 369 0 147 86 273 210 332l12-223s-22-7-27-9c-46-20-79-80-79-158 0-84 65-157 129-158 64 1 129 74 129 158 0 78-33 138-79 158-1 0-27 10-27 10l13 248c28 7 58 11 88 11 41 0 81-7 117-20l12-221c-30-6-56-26-72-50-20-29 15-294 15-294h23v248h23v-248h25v248h23v-248h25v248h23v-248h18s35 265 15 295c-16 23-41 42-71 49l-1 1 10 190c110-64 184-183 184-319 0-204-165-369-369-369zm-199 274c1-6 3-11 3-11 0-2-1-4-3-5s-4-1-6 1c0 0-2 4-6 10-3 5-7 13-10 24-3 8-6 20-7 34-1 7-1 13-1 19 1 8 2 14 4 21 7 21 13 41 33 60 6 7 13 11 18 15l1 1c1 0 2 1 3 2 4 2 7 3 7 3 2 0 4-1 5-2 1-2 0-4-1-6 0 0-3-2-6-5-2-3-4-6-6-10-2-2-4-5-6-8-10-15-16-36-23-57-2-5-3-11-4-16 0-6-1-12-1-17 0-12 1-23 2-31 1-10 2-17 4-22zm199-343c-241 0-437 197-437 438s196 438 437 438 438-197 438-438-197-438-438-438zm0 843c-223 0-405-182-405-405s182-405 405-405 405 182 405 405-182 405-405 405z" />
                    </svg>
                    Add Recipes
                  </li>
                  {userData.role === "admin" && (
                    <>
                      <li
                        onClick={() => setActiveSection("confirmRecipes")}
                        className={
                          activeSection === "confirmRecipes" ? "active" : ""
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          style={{ width: "18px" }}
                        >
                          <path d="m12 1c-6.074 0-11 4.926-11 11s4.926 11 11 11 11-4.926 11-11-4.926-11-11-11zm-1.5 15.5-4.5-4.5 1.5-1.5 3 3 5.956-5.956 1.5 1.413z" />
                        </svg>
                        Confirm new Recipes(admin)
                      </li>
                      <li
                        onClick={() => setActiveSection("confirmArticles")}
                        className={
                          activeSection === "confirmArticles" ? "active" : ""
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="m256 8c-136.967 0-248 111.033-248 248s111.033 248 248 248 248-111.033 248-248-111.033-248-248-248zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068l-141.352 140.216-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z" />
                        </svg>
                        Confirm new Articles(admin)
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </aside>
            <main className="main-content">
              {activeSection === "personalInfo" && (
                <div className="profile-content">
                  <h1>Personal Info</h1>
                  <p>
                    These details will be used for all the Meredith profiles
                    associated...
                  </p>
                  <form onSubmit={(e) => handleSaveChanges(e, "personalInfo")}>
                    <div className="form-group">
                      <label htmlFor="email">Email Address*</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="first-name">First Name</label>
                      <input
                        type="text"
                        id="first-name"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="last-name">Last Name</label>
                      <input
                        type="text"
                        id="last-name"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">PhoneNumber</label>
                      <input
                        type="text"
                        id="phone"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="save-changes">
                      <button type="submit">Save Changes</button>
                    </div>
                  </form>
                </div>
              )}
              {activeSection === "publicProfileSettings" && (
                <div className="public-profile-settings-section">
                  <h2>Public Profile Settings</h2>
                  <p>
                    You have opted out of having a public profile, so the
                    information on this page will not be visible to other
                    users...
                  </p>
                  <form
                    onSubmit={(e) =>
                      handleSaveChanges(e, "publicProfileSettings")
                    }
                  >
                    <div className="profile-settings-form">
                      <div className="add-image">
                        <div className="image-upload">
                          <div className="add-image-button">
                            <div
                              className="upload-user-icon"
                              onClick={handleImageUploadClick}
                            >
                              {imagePreviewUrl && imagePreviewUrl !== "" ? (
                                <img
                                  src={imagePreviewUrl}
                                  alt="User"
                                  className="user-image"
                                />
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 496 512"
                                >
                                  <path d="m248 8c-137 0-248 111-248 248s111 248 248 248 248-111 248-248-111-248-248-248zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9s28-2.7 40.9-6.9c2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8-35.2 41.6-87.8 68.2-146.5 68.2z" />
                                </svg>
                              )}
                              <div className="pencil-icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 17 19"
                                >
                                  <path
                                    d="m16.417 9.579a7.917 7.917 0 1 1 -7.917-7.917 7.917 7.917 0 0 1 7.917 7.917zm-11.787-1.397 2.45-2.449-.966-.966a.794.794 0 0 0 -1.12 0l-1.329 1.33a.794.794 0 0 0 0 1.12zm8.23 5.961c.13 0 .206-.1.173-.247l-.573-2.542a1.289 1.289 0 0 0 -.292-.532l-4.53-4.53-.634.636 4.529 4.529.252-.252a.793.793 0 0 1 .147.268l.253 1.124-.69.69-1.125-.252a.799.799 0 0 1 -.268-.148l.871-.87-4.53-4.53-1.253 1.255 4.53 4.528a1.294 1.294 0 0 0 .533.293l2.542.573a.3.3 0 0 0 .066.008z"
                                    transform="rotate(90, 8.5, 9.5)"
                                  />
                                </svg>
                              </div>
                            </div>
                            <input
                              ref={fileInputRef}
                              type="file"
                              onChange={handleImageChange}
                              style={{
                                display: "none",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="profile-data">
                        <div className="display-name">
                          <label htmlFor="displayName">Display Name*</label>
                          <input
                            type="text"
                            id="displayName"
                            placeholder="Your display name"
                            name="userName"
                            value={userData.userName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="save-changes">
                      <button type="submit">Save Changes</button>
                    </div>
                  </form>
                </div>
              )}
              {activeSection === "changePassword" && (
                <div className="profile-content">
                  <h1>Change Password</h1>
                  <p>
                    If you want to change your password, click the button below,
                    and we will send password reset instructions to your email
                    address.
                  </p>

                  <div className="save-changes">
                    <button type="submit">Reset Password</button>
                  </div>
                </div>
              )}
              {activeSection === "healthCare" && (
                <div className="profile-content">
                  <h1>Your health care info</h1>
                  <p></p>
                  <UserBMI userId={Number(userId)} />
                </div>
              )}
              {activeSection === "addArticles" && (
                <div className="profile-content">
                  <h1>Add your own article</h1>
                  <UserArticles userId={userId} />
                </div>
              )}
              {activeSection === "addRecipes" && (
                <div className="profile-content">
                  <h1>Add your own Recipe</h1>
                  <UserRecipes userId={userId} />
                </div>
              )}
              {activeSection === "confirmRecipes" && (
                <div className="profile-content">
                  <h1>Confirm Recipes</h1>
                  <AdminConfirmeRecipes userId={userId} />
                </div>
              )}
              {activeSection === "confirmArticles" && (
                <div className="profile-content">
                  <h1>Confirm Articles</h1>
                  <AdminConfirmeArticles userId={userId} />
                </div>
              )}
            </main>
          </div>
        </div>
      </>
    );
  }
};

export default ProfilePage;

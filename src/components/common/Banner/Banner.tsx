import React from "react";
import PropTypes from "prop-types";
import "./Banner.scss";

interface BannerProps {
  title?: string;
  description?: string;
  bannerImageUrl: string;
  alignment: "left" | "center" | "right";
  titleColor?: string;
  descriptionColor?: string;
  bannerHeight?: number;
  isDarken?: boolean;
  bannerMarginTop?: number;
}

const Banner: React.FC<BannerProps> = ({
  title,
  description,
  bannerImageUrl,
  alignment,
  bannerMarginTop,
  titleColor = "white",
  descriptionColor = "white",
  bannerHeight = 600,
  isDarken = false,
}) => {
  const contentStyles = {
    textAlign: alignment as "left" | "center" | "right",
    color: titleColor,
    marginTop: `${bannerMarginTop}px`,
  };

  return (
    <div
      className="banner no-print"
      style={{
        backgroundImage: isDarken
          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bannerImageUrl})`
          : `url(${bannerImageUrl})`,
        height: `${bannerHeight}px`,
      }}
    >
      <div className="banner-content" style={contentStyles}>
        {title && (
          <h1 className="banner-title" style={{ color: titleColor }}>
            {title}
          </h1>
        )}
        {description && (
          <p className="banner-description" style={{ color: descriptionColor }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

Banner.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  bannerImageUrl: PropTypes.string.isRequired,
};

export default Banner;

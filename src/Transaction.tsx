import React from "react";
import { FaGlassCheers, FaHeart } from "react-icons/fa";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { BalanceRow } from "./types";

const cardClasses = ["mt-2"].join(" ");

const cardStyle = {
  color: "purple",
  borderColor: "purple",
  backgrondColor: "white",
  fontFamily: "Roboto",
  fontSize: "1.1rem",
};

const emptyCardStyle = { ...cardStyle, backgroundImage: "linear-gradient(#333, #999)", color: "yellow" };

// This of course could be its own library

const renderIcon = (src: string | null) => {
  if (!src) return <FaGlassCheers />;
  if (src.includes("https://")) return <img src={src} alt="Logo" className="logo-size" />;

  switch (src) {
    case "heart":
      return <FaHeart />;
    default:
      return <FaGlassCheers />;
  }
};

const renderCard = (data: BalanceRow) => {
  return (
    <Card body style={cardStyle} className={cardClasses}>
      <Row style={{ textAlign: "center" }}>
        <Col xs={2}>{renderIcon(data.logo)}</Col>
        <Col xs={2}>{data.balance}</Col>
        <Col xs={2}>{data.symbol}</Col>
        <Col xs={2}>{data.name}</Col>
        <Col style={{ overflowX: "clip" }}>{data.contractAddress}</Col>
      </Row>
    </Card>
  );
};

const Transaction = (props?: { data?: BalanceRow }) => {
  if (props && props.data) return renderCard(props.data);
  return (
    <Card body style={emptyCardStyle} className={cardClasses}>
      <Row style={{ textAlign: "center" }}>
        <Col>Feed me, Seymour.</Col>
      </Row>
    </Card>
  );
};

export default Transaction;

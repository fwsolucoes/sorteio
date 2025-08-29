import { styled } from "@linaria/react";

const Container = styled.div`
  max-width: 600px;
  margin: 32px auto;
  padding: 32px;
  border-radius: var(--rounded-cards);
  background: var(--background);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
`;

const SuccessBox = styled.div`
  padding: 16px;
  border-radius: 12px;
  background: #e6fbe6;
  color: #256029;
  text-align: center;

  strong {
    font-size: 1.2rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.95rem;
  margin-bottom: 12px;

  &:focus {
    outline: none;
    border-color: #0066ff;
    box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.2);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  background: #0066ff;
  color: #fff;
  cursor: pointer;

  &:hover:enabled {
    background: #0052cc;
  }

  &:disabled {
    background: #999;
    cursor: not-allowed;
  }
`;

export { Button, Container, Input, SuccessBox, Title };

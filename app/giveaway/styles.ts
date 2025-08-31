import { styled } from "@linaria/react";

const Container = styled.div`
  max-width: 600px;
  margin: 32px auto;
  padding: 32px;
  border-radius: 16px;
  background: var(--background);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  img {
    max-width: 100%;
  }

  .description {
    font-size: 1.125rem;
    font-weight: 400;
    color: var(--text-body);

    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 8px;

    width: 100%;
  }

  .arkynButton {
    margin-top: 24px;
  }

  .oracaoPlayDownload {
    display: flex;
    flex-direction: column;
    gap: 16px;

    color: var(--text-body);

    .buttonLinks {
      display: flex;
      gap: 16px;
    }
  }

  .donationBanner {
    display: flex;
    flex-direction: column;

    border: 1px solid var(--border);
    border-radius: 8px;

    padding: 16px;

    text-align: center;

    .message {
      display: flex;
      align-items: center;
      gap: 16px;

      color: var(--text-body);
    }

    .arkynButton {
      width: 100%;
    }
  }

  @media (max-width: 650px) {
    max-width: calc(100vw - 16px);
    margin: 8px auto;

    padding: 16px;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem; //24px
  font-weight: 700;
  text-align: center;
  color: var(--text-heading);
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

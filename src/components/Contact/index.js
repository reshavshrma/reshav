import styled from "styled-components";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastFix.css"; 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 4px;
`;

const Required = styled.span`
  color: #ff4444;
  margin-left: 2px;
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid
    ${({ theme, error }) => (error ? "#ff4444" : theme.text_secondary)};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 9px 13px;
  &:focus {
    border: 1px solid
      ${({ theme, error }) => (error ? "#ff4444" : theme.primary)};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid
    ${({ theme, error }) => (error ? "#ff4444" : theme.text_secondary)};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 9px 13px;
  resize: vertical;
  &:focus {
    border: 1px solid
      ${({ theme, error }) => (error ? "#ff4444" : theme.primary)};
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  font-size: 14px;
  margin-top: 4px;
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -moz-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -webkit-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  padding: 10px 13px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const Contact = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    from_email: "",
    from_name: "",
    subject: "",
    message: "",
  });
  const form = useRef();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.from_email.trim()) {
      newErrors.from_email = "Email is required";
    } else if (!validateEmail(formData.from_email)) {
      newErrors.from_email = "Please enter a valid email address";
    }
    if (!formData.from_name.trim()) {
      newErrors.from_name = "Name is required";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      emailjs
        .sendForm(
          "service_057gmkc",
          "template_q83jp3j",
          form.current,
          "Xmci0qk-e8DmWNpnK"
        )
        .then(
          () => {
            toast.success("Email sent successfully!", {
              position: "top-center",
              autoClose:3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
              style: {
                fontSize: "16px",
                maxWidth: "400px",
              },
            });
            form.current.reset();
            setFormData({
              from_email: "",
              from_name: "",
              subject: "",
              message: "",
            });
            setErrors({});
          },
          (error) => {
            toast.error("Failed to send email. Please try again.", {
              position: "top-center",
              autoClose: 3000,
              theme: "colored",
              style: {
                fontSize: "16px",
                maxWidth: "400px",
              },
            });
            console.error(error.text);
          }
        );
    }
  };

  return (
    <Container id="contact">
      <Wrapper>
        <Title>Contact</Title>
        <Desc>
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>

          <InputGroup>
            <Label>
              Your Email <Required>*</Required>
            </Label>
            <ContactInput
              placeholder="Your Email"
              name="from_email"
              value={formData.from_email}
              onChange={handleInputChange}
              error={errors.from_email}
            />
            {errors.from_email && (
              <ErrorMessage>{errors.from_email}</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Label>
              Your Name <Required>*</Required>
            </Label>
            <ContactInput
              placeholder="Your Name"
              name="from_name"
              value={formData.from_name}
              onChange={handleInputChange}
              error={errors.from_name}
            />
            {errors.from_name && (
              <ErrorMessage>{errors.from_name}</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Label>
              Subject <Required>*</Required>
            </Label>
            <ContactInput
              placeholder="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              error={errors.subject}
            />
            {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>
              Message <Required>*</Required>
            </Label>
            <ContactInputMessage
              placeholder="Message"
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              error={errors.message}
            />
            {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
          </InputGroup>

          <ContactButton type="submit" value="Send" />
        </ContactForm>

        <ToastContainer
          position="top-center"
          style={{ marginTop: "70px" }}
        />
      </Wrapper>
    </Container>
  );
};

export default Contact;

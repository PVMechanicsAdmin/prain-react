import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const FormTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #14171a;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e3f2fd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #1976d2;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: 600;
  color: #14171a;
`;

const TimeStamp = styled.div`
  font-size: 14px;
  color: #666;
`;

const FormSection = styled.div`
  margin-bottom: 25px;
`;

const SectionLabel = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 10px;
  color: #14171a;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 15px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #1da1f2;
  }
  
  &::placeholder {
    color: #657786;
  }
`;

const PINTypeSection = styled.div`
  margin-bottom: 25px;
`;

const PINTypeLabel = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 15px;
  color: #14171a;
`;

const PINTypeOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
`;

const PINTypeOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #1da1f2;
    background: #f7f9fa;
  }
  
  input[type="radio"]:checked + & {
    border-color: #1da1f2;
    background: #e3f2fd;
  }
`;

const RadioInput = styled.input`
  display: none;
`;

const PINTypeIcon = styled.span`
  font-size: 20px;
`;

const PINTypeText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const PreviewSection = styled.div`
  margin-bottom: 25px;
`;

const PreviewLabel = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 15px;
  color: #14171a;
`;

const PreviewBox = styled.div`
  width: 100%;
  height: 200px;
  border: 2px dashed #e1e8ed;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  color: #657786;
  font-size: 16px;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const FileUploadSection = styled.div`
  margin-bottom: 25px;
`;

const FileUploadLabel = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 10px;
  color: #14171a;
`;

const FileUploadInput = styled.input`
  display: none;
`;

const FileUploadButton = styled.label`
  display: inline-block;
  padding: 12px 24px;
  background: #f8f9fa;
  border: 2px dashed #e1e8ed;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #1da1f2;
    background: #e3f2fd;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const CancelButton = styled(Button)`
  background: #f8f9fa;
  color: #14171a;
  border: 2px solid #e1e8ed;
  
  &:hover {
    background: #e9ecef;
  }
`;

const SubmitButton = styled(Button)`
  background: #17bf63;
  color: white;
  
  &:hover {
    background: #15a052;
  }
`;

const SaveButton = styled(Button)`
  background: #1da1f2;
  color: white;
  
  &:hover {
    background: #1991db;
  }
`;

const PINCreationTool = ({ isOpen, onClose, onSubmit, prayerContext }) => {
  const [formData, setFormData] = useState({
    content: '',
    pinType: 'Note',
    image: null,
    audio: null,
    video: null
  });
  
  const [previewUrl, setPreviewUrl] = useState(null);

  const pinTypes = [
    { value: 'Note', icon: '📝', label: 'Note' },
    { value: 'Prayer', icon: '🙏', label: 'Prayer' },
    { value: 'Audio', icon: '🎵', label: 'Audio' },
    { value: 'Verse', icon: '📖', label: 'Verse' },
    { value: 'Meme', icon: '😄', label: 'Meme' },
    { value: 'Quote', icon: '💬', label: 'Quote' },
    { value: 'Image', icon: '🖼️', label: 'Image' },
    { value: 'Video', icon: '🎬', label: 'Video' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        [fileType]: file
      });
      
      // Create preview URL for images
      if (fileType === 'image' && file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  };

  const handleSubmit = () => {
    if (formData.content.trim()) {
      onSubmit(formData);
      onClose();
      // Reset form
      setFormData({
        content: '',
        pinType: 'Note',
        image: null,
        audio: null,
        video: null
      });
      setPreviewUrl(null);
    }
  };

  const handleSave = () => {
    // Save as draft functionality
    console.log('Saving PIN as draft:', formData);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        
        <FormTitle>CREATE A PIN</FormTitle>
        
        {prayerContext && (
          <div style={{
            marginBottom: '20px',
            padding: '15px',
            background: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '8px',
            borderLeft: '4px solid #ffc107'
          }}>
            <div style={{ fontWeight: '600', marginBottom: '5px', color: '#856404' }}>
              Responding to Prayer Request
            </div>
            <div style={{ color: '#856404' }}>
              <strong>{prayerContext.name}</strong> - {prayerContext.category} → {prayerContext.subcategory}
            </div>
          </div>
        )}

        <PINTypeSection>
          <PINTypeLabel>Select PIN Type</PINTypeLabel>
          <PINTypeOptions>
            {pinTypes.map((type) => (
              <PINTypeOption key={type.value}>
                <RadioInput
                  type="radio"
                  name="pinType"
                  value={type.value}
                  checked={formData.pinType === type.value}
                  onChange={handleInputChange}
                />
                <PINTypeIcon>{type.icon}</PINTypeIcon>
                <PINTypeText>{type.label}</PINTypeText>
              </PINTypeOption>
            ))}
          </PINTypeOptions>
        </PINTypeSection>

        <FormSection>
          <SectionLabel htmlFor="content">Content</SectionLabel>
          <TextArea
            id="content"
            name="content"
            placeholder="Share your thoughts, prayer request, or inspiration..."
            value={formData.content}
            onChange={handleInputChange}
          />
        </FormSection>

        {(formData.pinType === 'Image' || formData.pinType === 'Meme') && (
          <FileUploadSection>
            <FileUploadLabel>Upload Image</FileUploadLabel>
            <FileUploadInput
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'image')}
            />
            <FileUploadButton htmlFor="imageUpload">
              {formData.image ? formData.image.name : 'Choose Image'}
            </FileUploadButton>
          </FileUploadSection>
        )}

        {formData.pinType === 'Audio' && (
          <FileUploadSection>
            <FileUploadLabel>Upload Audio</FileUploadLabel>
            <FileUploadInput
              type="file"
              id="audioUpload"
              accept="audio/*"
              onChange={(e) => handleFileUpload(e, 'audio')}
            />
            <FileUploadButton htmlFor="audioUpload">
              {formData.audio ? formData.audio.name : 'Choose Audio File'}
            </FileUploadButton>
          </FileUploadSection>
        )}

        {formData.pinType === 'Video' && (
          <FileUploadSection>
            <FileUploadLabel>Upload Video</FileUploadLabel>
            <FileUploadInput
              type="file"
              id="videoUpload"
              accept="video/*"
              onChange={(e) => handleFileUpload(e, 'video')}
            />
            <FileUploadButton htmlFor="videoUpload">
              {formData.video ? formData.video.name : 'Choose Video File'}
            </FileUploadButton>
          </FileUploadSection>
        )}

        <PreviewSection>
          <PreviewLabel>Preview</PreviewLabel>
          <PreviewBox>
            {previewUrl ? (
              <ImagePreview src={previewUrl} alt="Preview" />
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>⛰️☀️</div>
                <div>Content preview will appear here</div>
              </div>
            )}
          </PreviewBox>
        </PreviewSection>

        <ActionButtons>
          <SaveButton onClick={handleSave}>SAVE PIN</SaveButton>
          <CancelButton onClick={onClose}>CANCEL</CancelButton>
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        </ActionButtons>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PINCreationTool;

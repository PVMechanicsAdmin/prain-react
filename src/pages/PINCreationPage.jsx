import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import '../styles/design-system.css';

// Google Fonts to load
const GOOGLE_FONTS = [
  'Roboto',
  'Open Sans',
  'Lato',
  'Poppins',
  'Montserrat'
];

// Load Google Fonts
const loadGoogleFonts = () => {
  GOOGLE_FONTS.forEach(font => {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${font.replace(' ', '+')}:wght@300;400;500;600;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  });
};

const PageContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 15px;
    max-width: 100%;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e1e8ed;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
    margin-bottom: 20px;
    padding-bottom: 15px;
  }
`;

const PageTitle = styled.h1`
  margin: 0;
  color: #14171a;
  font-size: 28px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background: #f8f9fa;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  color: #14171a;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e9ecef;
    border-color: #ced4da;
  }
`;

const PrayerContextSection = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 12px;
  border-left: 4px solid #ffc107;
`;

const ContextTitle = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
  color: #856404;
  font-size: 18px;
`;

const ContextDetails = styled.div`
  color: #856404;
  font-size: 16px;
  line-height: 1.5;
`;

const FormSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #14171a;
`;

const PINTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 20px;
  }
`;

const PINTypeOption = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  
  &:hover {
    border-color: #1da1f2;
    background: #f7f9fa;
    transform: translateY(-2px);
  }
  
  input[type="radio"]:checked + & {
    border-color: #1da1f2;
    background: #e3f2fd;
    box-shadow: 0 4px 12px rgba(29, 161, 242, 0.15);
  }
  
  @media (max-width: 768px) {
    padding: 15px 10px;
    gap: 8px;
  }
`;

const RadioInput = styled.input`
  display: none;
`;

const PINTypeIcon = styled.span`
  font-size: 32px;
`;

const PINTypeText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #14171a;
`;

const ContentSection = styled.div`
  margin-bottom: 30px;
`;

const FontControlsSection = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
`;

const FontSizeControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 25%;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FontSizeLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #14171a;
`;

const FontSizeSlider = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e1e8ed;
  outline: none;
  -webkit-appearance: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #1da1f2;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #1da1f2;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const FontSizeValue = styled.span`
  font-size: 12px;
  color: #657786;
  text-align: center;
`;

const FontFamilyControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 25%;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FontFamilyLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #14171a;
`;

const FontFamilySelect = styled.select`
  padding: 8px 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #1da1f2;
    box-shadow: 0 0 0 3px rgba(29, 161, 242, 0.1);
  }
  
  &:hover {
    border-color: #1da1f2;
  }
`;

const ContentLabel = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 10px;
  color: #14171a;
  font-size: 16px;
`;

const ContentTextarea = styled.textarea`
  width: 75%;
  min-height: 80px;
  padding: 20px;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  line-height: 1.6;
  
  &:focus {
    outline: none;
    border-color: #1da1f2;
    box-shadow: 0 0 0 3px rgba(29, 161, 242, 0.1);
  }
  
  &::placeholder {
    color: #657786;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    min-height: 60px;
    padding: 15px;
  }
`;

const FileUploadSection = styled.div`
  margin-bottom: 30px;
`;

const FileUploadLabel = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 15px;
  color: #14171a;
  font-size: 16px;
`;

const FileUploadInput = styled.input`
  display: none;
`;

const FileUploadButton = styled.label`
  display: inline-block;
  padding: 15px 30px;
  background: #f8f9fa;
  border: 2px dashed #e1e8ed;
  border-radius: 12px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;
  font-weight: 500;
  
  &:hover {
    border-color: #1da1f2;
    background: #e3f2fd;
  }
`;

const MusicSection = styled.div`
  margin-bottom: 30px;
`;

const VerseSection = styled.div`
  margin-bottom: 30px;
`;

const VerseTypeFilter = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

const VerseTypeLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #14171a;
  white-space: nowrap;
`;

const VerseTypeSelect = styled.select`
  padding: 10px 15px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: #1da1f2;
    box-shadow: 0 0 0 3px rgba(29, 161, 242, 0.1);
  }
  
  &:hover {
    border-color: #1da1f2;
  }
`;

const VerseTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #14171a;
`;

const VerseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const VerseCard = styled.div`
  background: white;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: #1da1f2;
  }
  
  &.selected {
    border-color: #17bf63;
    box-shadow: 0 0 0 3px rgba(23, 191, 99, 0.2);
  }
`;

const VerseImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
  
  @media (max-width: 768px) {
    height: 150px;
  }
`;

const VerseInfo = styled.div`
  padding: 12px;
  text-align: center;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const VerseTitleText = styled.h6`
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #14171a;
`;

const VerseReference = styled.p`
  font-size: 11px;
  margin: 0;
  color: #657786;
  line-height: 1.2;
  max-height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const MusicTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #14171a;
`;

const MusicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const MusicCard = styled.div`
  background: white;
  border: 2px solid #e1e8ed;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: #1da1f2;
  }
  
  &.playing {
    border-color: #17bf63;
    box-shadow: 0 8px 25px rgba(23, 191, 99, 0.2);
  }
`;

const MusicCardHeader = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const MusicArtwork = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
  object-fit: cover;
`;

const MusicInfo = styled.div`
  flex: 1;
`;

const SongTitle = styled.h5`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const ArtistName = styled.p`
  font-size: 14px;
  margin: 0 0 12px 0;
  opacity: 0.9;
`;

const MusicTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-start;
`;

const MusicTag = styled.span`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`;

const MusicCardBody = styled.div`
  padding: 20px;
`;

const AudioPlayer = styled.div`
  margin-bottom: 20px;
`;

const ProgressContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #e1e8ed;
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #1da1f2, #17bf63);
  border-radius: 3px;
  transition: width 0.1s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const TimeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #657786;
  margin-bottom: 15px;
`;

const ControlButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const ControlButton = styled.button`
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 50%;
  background: ${props => props.primary ? '#1da1f2' : '#f8f9fa'};
  color: ${props => props.primary ? 'white' : '#14171a'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
    background: ${props => props.primary ? '#1991db' : '#e9ecef'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const PreviewSection = styled.div`
  margin-bottom: 30px;
`;

const PreviewBox = styled.div`
  width: 100%;
  min-height: 200px;
  border: 2px dashed #e1e8ed;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  color: #657786;
  font-size: 16px;
  overflow: hidden;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

const ImageSliderSection = styled.div`
  margin-bottom: 30px;
`;

const SliderTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #14171a;
`;

const ImageSliderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 15px;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const ScrollArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #e1e8ed;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  color: #14171a;
  z-index: 10;
  transition: all 0.2s ease;
  
  &:hover {
    background: white;
    border-color: #1da1f2;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }
`;

const LeftArrow = styled(ScrollArrow)`
  left: -20px;
`;

const RightArrow = styled(ScrollArrow)`
  right: -20px;
`;

const ImageSlider = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 10px 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SliderImage = styled.div`
  flex-shrink: 0;
  width: 120px;
  height: 80px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #1da1f2;
    transform: scale(1.05);
  }
  
  &.selected {
    border-color: #1da1f2;
    box-shadow: 0 0 0 3px rgba(29, 161, 242, 0.2);
  }
  
  @media (max-width: 768px) {
    width: 100px;
    height: 70px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  width: 100%;
  color: #657786;
  font-size: 16px;
  
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid #e1e8ed;
    border-top: 2px solid #1da1f2;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 10px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SliderImageContent = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const OverlayPreview = styled.div`
  position: relative;
  width: 100%;
  min-height: 300px;
  border: 2px dashed #e1e8ed;
  border-radius: 12px;
  overflow: hidden;
  background: #f8f9fa;
  
  ${props => props.isLoading && `
    &::before {
      content: 'Loading preview...';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #657786;
      font-size: 16px;
      z-index: 1;
    }
  `}
  
  @media (max-width: 768px) {
    min-height: 200px;
  }
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const OverlayText = styled.div`
  color: white;
  font-size: ${props => props.fontSize || '18px'};
  font-family: ${props => props.fontFamily || 'inherit'};
  font-weight: 500;
  text-align: center;
  line-height: 1.6;
  max-width: 80%;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  padding-top: 30px;
  border-top: 2px solid #e1e8ed;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    justify-content: stretch;
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 14px;
  }
`;

const SaveButton = styled(Button)`
  background: #1da1f2;
  color: white;
  
  &:hover {
    background: #1991db;
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

const PINCreationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prayerContext = location.state?.prayerContext;
  
  const [formData, setFormData] = useState({
    content: '',
    pinType: 'Note',
    image: null,
    audio: null,
    video: null,
    selectedMusic: null,
    selectedVerse: null
  });
  
  const [verseType, setVerseType] = useState('Dynamic');
  
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageSliderIndex, setImageSliderIndex] = useState(0);
  const [relevantImages, setRelevantImages] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState('Roboto');
  
  // Music player state
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedMusicId, setSelectedMusicId] = useState(null);

  const pinTypes = [
    { value: 'Note', icon: '📝', label: 'Note' },
    { value: 'Prayer', icon: '🙏', label: 'Prayer' },
    { value: 'Audio', icon: '🎵', label: 'Audio' },
    { value: 'Verse', icon: '📖', label: 'Verses' },
    { value: 'Meme', icon: '😄', label: 'Meme' },
    { value: 'Quote', icon: '💬', label: 'Quote' },
    { value: 'Image', icon: '🖼️', label: 'Image' },
    { value: 'Video', icon: '🎬', label: 'Video' }
  ];

  // Music data
  const musicData = [
    {
      id: 1,
      title: 'Mountains Move',
      artist: 'Katie Overbeek',
      tags: ['With Lyrics', 'Indie', 'Reflective', 'Uplifting', 'Worship'],
      artwork: '/images/music/Katie_Overbeek.png',
      audioFile: '/audio/MountainsMove.mp3'
    },
    {
      id: 2,
      title: 'Not Illegitimate',
      artist: 'Katie Overbeek',
      tags: ['With Lyrics', 'Reflective', 'Uplifting', 'Worship'],
      artwork: '/images/music/Katie_Overbeek.png',
      audioFile: '/audio/Not_Illegitimate.mp3'
    },
    {
      id: 3,
      title: 'Mountains Valleys',
      artist: 'Nai and J',
      tags: ['With Lyrics', 'Congregational', 'Uplifting', 'Worship'],
      artwork: '/images/music/Nai_J.png',
      audioFile: '/audio/MountainsValleys.mp3'
    },
    {
      id: 4,
      title: 'I Will Say',
      artist: 'Katie Overbeek',
      tags: ['With Lyrics', 'Uplifting', 'Hopeful', 'Worship'],
      artwork: '/images/music/Katie_Overbeek.png',
      audioFile: '/audio/I_Will_Say.mp3'
    },
    {
      id: 5,
      title: 'Wonderfully Made',
      artist: 'Nai and J',
      tags: ['With Lyrics', 'Ambient', 'Worship'],
      artwork: '/images/music/Nai_J.png',
      audioFile: '/audio/WonderfullyMade.mp3'
    },
    {
      id: 6,
      title: 'All I Need',
      artist: 'Frannie',
      tags: ['With Lyrics', 'Ambient', 'Peaceful', 'Worship'],
      artwork: '/images/music/Frannie.png',
      audioFile: '/audio/All_I_Need.mp3'
    }
  ];

  // Dynamic verse data - topic-aware Bible verses with appropriate images
  const getDynamicVerseData = (category, subcategory) => {
    const verseMap = {
      'HEALTH': {
        'Surgery': [
          { id: 1, title: 'Psalm 147:3', reference: 'He heals the brokenhearted and binds up their wounds.', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop' },
          { id: 2, title: 'Jeremiah 30:17', reference: 'But I will restore you to health and heal your wounds, declares the Lord.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop' },
          { id: 3, title: 'Isaiah 53:5', reference: 'But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.', image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop' }
        ],
        'Recovery': [
          { id: 4, title: 'Psalm 41:3', reference: 'The Lord sustains them on their sickbed and restores them from their bed of illness.', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop' },
          { id: 5, title: 'James 5:15', reference: 'And the prayer offered in faith will make the sick person well; the Lord will raise them up.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop' }
        ],
        'Mental Health': [
          { id: 6, title: 'Philippians 4:6-7', reference: 'Do not be anxious about anything, but present your requests to God with thanksgiving. And the peace of God will guard your hearts and minds.', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop' },
          { id: 7, title: 'Isaiah 26:3', reference: 'You will keep in perfect peace those whose minds are steadfast, because they trust in you.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop' }
        ]
      },
      'FAMILY': {
        'Marriage': [
          { id: 8, title: 'Ephesians 5:25', reference: 'Husbands, love your wives, just as Christ loved the church and gave himself up for her.', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop' },
          { id: 9, title: '1 Corinthians 13:4-7', reference: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It always protects, always trusts, always hopes, always perseveres.', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=400&fit=crop' }
        ],
        'Children': [
          { id: 10, title: 'Proverbs 22:6', reference: 'Start children off on the way they should go, and even when they are old they will not turn from it.', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop' },
          { id: 11, title: 'Psalm 127:3', reference: 'Children are a heritage from the Lord, offspring a reward from him.', image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=400&fit=crop' }
        ]
      },
      'FINANCE': {
        'Job Search': [
          { id: 12, title: 'Philippians 4:19', reference: 'And my God will meet all your needs according to the riches of his glory in Christ Jesus.', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=400&fit=crop' },
          { id: 13, title: 'Matthew 6:33', reference: 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop' }
        ],
        'Debt': [
          { id: 14, title: 'Proverbs 22:7', reference: 'The rich rule over the poor, and the borrower is slave to the lender.', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop' },
          { id: 15, title: 'Romans 13:8', reference: 'Let no debt remain outstanding, except the continuing debt to love one another.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop' }
        ]
      },
      'SPIRITUAL': {
        'Growth': [
          { id: 16, title: '2 Peter 3:18', reference: 'But grow in the grace and knowledge of our Lord and Savior Jesus Christ.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop' },
          { id: 17, title: 'Colossians 2:6-7', reference: 'So then, just as you received Christ Jesus as Lord, continue to live your lives in him, rooted and built up in him.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop' }
        ],
        'Guidance': [
          { id: 18, title: 'Proverbs 3:5-6', reference: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop' },
          { id: 19, title: 'Psalm 119:105', reference: 'Your word is a lamp for my feet, a light on my path.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop' }
        ]
      }
    };
    
    // Return relevant verses for the category/subcategory, or default verses
    const relevantVerses = verseMap[category]?.[subcategory] || 
                          verseMap[category]?.[Object.keys(verseMap[category] || {})[0]] ||
                          getDefaultVerses();
    
    // Return 15 verses (either relevant ones or default ones)
    return relevantVerses.length >= 15 ? relevantVerses : [...relevantVerses, ...getDefaultVerses().slice(0, 15 - relevantVerses.length)];
  };
  
  // Default verses for any category
  const getDefaultVerses = () => [
    { id: 20, title: 'John 3:16', reference: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop' },
    { id: 21, title: 'Psalm 23:1', reference: 'The Lord is my shepherd, I shall not want.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop' },
    { id: 22, title: 'Philippians 4:13', reference: 'I can do all this through him who gives me strength.', image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop' },
    { id: 23, title: 'Jeremiah 29:11', reference: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop' },
    { id: 24, title: 'Romans 8:28', reference: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop' }
  ];

  // Classic verse data - 15 random local verse images with scripture already on them
  const classicVerseData = [
    {
      id: 1,
      title: 'VERSE-014',
      reference: 'Scripture already on image',
      image: '/images/verses/VERSE-014.jpg'
    },
    {
      id: 2,
      title: 'VERSE-023',
      reference: 'Scripture already on image',
      image: '/images/verses/VERSE-023.jpg'
    },
    {
      id: 3,
      title: 'VERSE-045',
      reference: 'Scripture already on image',
      image: '/images/verses/VERSE-045.jpg'
    },
    {
      id: 4,
      title: 'VERSE-067',
      reference: 'Scripture already on image',
      image: '/images/verses/VERSE-067.jpg'
    },
    {
      id: 5,
      title: 'VERSE-089',
      reference: 'Scripture already on image',
      image: '/images/verses/VERSE-089.jpg'
    },
    {
      id: 6,
      title: 'VERSE-112',
      reference: 'Scripture already on image',
      image: '/images/verses/VERSE-112.jpg'
    },
    {
      id: 7,
      title: 'VERSE-134',
      reference: 'Scripture already on image',
      image: '/images/verses/VERSE-134.jpg'
    },
    {
      id: 8,
      title: 'VERSE-156',
      reference: 'Scripture already on image',
      image: '/images/verses/VERSE-156.jpg'
    },
    {
      id: 9,
      title: 'VERSE-178',
      reference: 'Scripture already on image',
      image: '/images/verses/VERSE-178.jpg'
    },
    {
      id: 10,
      title: 'VERSE-001',
      reference: 'Scripture already on image',
      image: '/images/verses/VERSE-001.jpg'
    },
    {
      id: 11,
      title: 'VERSE-025',
      reference: 'Scripture already on image',
      image: '/images/verses/VERSE-025.jpg'
    },
    {
      id: 12,
      title: 'VERSE-047',
      reference: 'Scripture already on image',
      image: '/images/verses/VERSE-047.jpg'
    },
    {
      id: 13,
      title: 'VERSE-069',
      reference: 'Scripture already on image',
      image: '/images/verses/VERSE-069.jpg'
    },
    {
      id: 14,
      title: 'VERSE-091',
      reference: 'Scripture already on image',
      image: '/images/verses/VERSE-091.jpg'
    },
    {
      id: 15,
      title: 'VERSE-113',
      reference: 'Scripture already on image',
      image: '/images/verses/VERSE-113.jpg'
    }
  ];

  // Get current verse data based on selected type
  const getCurrentVerseData = () => {
    if (verseType === 'Classic') {
      return classicVerseData;
    } else {
      // For Dynamic verses, use topic-aware data if prayer context exists
      if (prayerContext) {
        return getDynamicVerseData(prayerContext.category, prayerContext.subcategory);
      } else {
        return getDefaultVerses();
      }
    }
  };

  // Generate relevant images based on prayer context using Unsplash API
  const getRelevantImages = async () => {
    if (!prayerContext) return [];
    
    setIsLoadingImages(true);
    
    try {
      // Create search terms based on category and subcategory
      const searchTerms = [
        prayerContext.category.toLowerCase(),
        prayerContext.subcategory.toLowerCase(),
        `${prayerContext.category} ${prayerContext.subcategory}`.toLowerCase()
      ];
      
      // Use Unsplash API to get relevant images
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerms[0])}&per_page=10&orientation=landscape`,
        {
          headers: {
            'Authorization': 'Client-ID MTWqthWWjaFnqjcnkrSgjfcPXs28F4D1U_m1uQMYDvo'
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        const images = data.results.map(photo => ({
          url: photo.urls.regular,
          alt: photo.alt_description || 'Relevant image',
          photographer: photo.user.name,
          unsplashUrl: photo.links.html
        }));
        setRelevantImages(images);
      } else {
        // Fallback to curated images if API fails
        setRelevantImages(getCuratedImages(prayerContext.category, prayerContext.subcategory));
      }
    } catch (error) {
      console.log('Using curated images as fallback');
      setRelevantImages(getCuratedImages(prayerContext.category, prayerContext.subcategory));
    } finally {
      setIsLoadingImages(false);
    }
  };

  // Curated fallback images for common prayer categories
  const getCuratedImages = (category, subcategory) => {
    const imageMap = {
      'HEALTH': {
        'Surgery': [
          'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop'
        ],
        'Recovery': [
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
        ],
        'Mental Health': [
          'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop'
        ]
      },
      'FAMILY': {
        'Marriage': [
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop'
        ],
        'Children': [
          'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop'
        ]
      },
      'FINANCE': {
        'Job Search': [
          'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
        ],
        'Debt': [
          'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop'
        ]
      },
      'SPIRITUAL': {
        'Growth': [
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop'
        ],
        'Guidance': [
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
        ]
      }
    };
    
    // Return relevant images or default to general category images
    return imageMap[category]?.[subcategory] || 
           imageMap[category]?.[Object.keys(imageMap[category])[0]] || 
           getDefaultImages();
  };

  // Default images for any category
  const getDefaultImages = () => [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop'
  ];

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleVerseSelect = (verse) => {
    setFormData(prev => ({
      ...prev,
      selectedVerse: verse
    }));
  };

  const handleVerseTypeChange = (e) => {
    setVerseType(e.target.value);
    // Clear selected verse when type changes
    setFormData(prev => ({
      ...prev,
      selectedVerse: null
    }));
  };

  const scrollLeft = () => {
    setImageSliderIndex(Math.max(0, imageSliderIndex - 1));
  };

  const scrollRight = () => {
    setImageSliderIndex(Math.min(relevantImages.length - 1, imageSliderIndex + 1));
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Reset selected image when PIN type changes
    if (e.target.name === 'pinType') {
      setSelectedImage(null);
      setFormData(prev => ({
        ...prev,
        selectedVerse: null,
        selectedMusic: null
      }));
      // Reset verse type to Dynamic when changing PIN type
      setVerseType('Dynamic');
    }
  };

  const handleFontSizeChange = (e) => {
    setFontSize(parseInt(e.target.value));
  };

  const handleFontFamilyChange = (e) => {
    setFontFamily(e.target.value);
  };

  // Audio player functions
  const handlePlayMusic = (music) => {
    // Stop any currently playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    
    const audio = new Audio(music.audioFile);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setSelectedMusicId(null);
    });
    
    audio.play();
    setCurrentAudio(audio);
    setIsPlaying(true);
    setSelectedMusicId(music.id);
    
    // Update form data with selected music for PIN creation
    setFormData(prev => ({
      ...prev,
      selectedMusic: music
    }));
  };

  const handlePauseMusic = () => {
    if (currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
      
      // Clear selected music from form data when paused
      setFormData(prev => ({
        ...prev,
        selectedMusic: null
      }));
    }
  };

  const handleStopMusic = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
      setSelectedMusicId(null);
      
      // Clear selected music from form data
      setFormData(prev => ({
        ...prev,
        selectedMusic: null
      }));
    }
  };

  const handleProgressClick = (e, music) => {
    if (!currentAudio || selectedMusicId !== music.id) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    currentAudio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
      // Here you would typically save the PIN to your database
      console.log('Creating PIN:', formData);
      
      // For Audio PINs, ensure music is selected
      if (formData.pinType === 'Audio' && !formData.selectedMusic) {
        alert('Please select a song to create an Audio PIN');
        return;
      }
      
      // For Verse PINs, ensure verse is selected
      if (formData.pinType === 'Verse' && !formData.selectedVerse) {
        alert('Please select a Bible verse to create a Verse PIN');
        return;
      }
      
      // Navigate back to prayer list page
      navigate('/prayer-list');
    }
  };

  const handleSave = () => {
    // Save as draft functionality
    console.log('Saving PIN as draft:', formData);
    
    // If it's an Image or Meme PIN with content and selected image, save as PNG
    if ((formData.pinType === 'Image' || formData.pinType === 'Meme') && 
        formData.content.trim() && selectedImage) {
      saveAsPNG();
    }
    
    // For Audio PINs, ensure music is selected
    if (formData.pinType === 'Audio' && !formData.selectedMusic) {
      alert('Please select a song to save as draft');
      return;
    }
    
    // For Verse PINs, ensure verse is selected
    if (formData.pinType === 'Verse' && !formData.selectedVerse) {
      alert('Please select a Bible verse to save as draft');
      return;
    }
  };

  const saveAsPNG = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to match the preview
    canvas.width = 800;  // Standard width for sharing
    canvas.height = 600;  // Standard height for sharing
    
    // Create a new image to get dimensions
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Handle CORS for external images
    
    img.onload = () => {
      // Calculate aspect ratio to fit image properly
      const imgAspectRatio = img.width / img.height;
      const canvasAspectRatio = canvas.width / canvas.height;
      
      let drawWidth, drawHeight, offsetX, offsetY;
      
      if (imgAspectRatio > canvasAspectRatio) {
        // Image is wider than canvas
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgAspectRatio;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        // Image is taller than canvas
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgAspectRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      }
      
      // Fill canvas with white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw the background image
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      
      // Add translucent overlay at the bottom (20% of height)
      const overlayHeight = canvas.height * 0.2;
      const overlayY = canvas.height - overlayHeight;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(0, overlayY, canvas.width, overlayHeight);
      
      // Add text overlay
      if (formData.content.trim()) {
        ctx.fillStyle = 'white';
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Word wrap function for long text
        const wrapText = (text, maxWidth) => {
          const words = text.split(' ');
          const lines = [];
          let currentLine = words[0];
          
          for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = ctx.measureText(currentLine + ' ' + word).width;
            if (width < maxWidth) {
              currentLine += ' ' + word;
            } else {
              lines.push(currentLine);
              currentLine = word;
            }
          }
          lines.push(currentLine);
          return lines;
        };
        
        const maxTextWidth = canvas.width * 0.8;
        const textLines = wrapText(formData.content, maxTextWidth);
        const lineHeight = fontSize * 1.2;
        const totalTextHeight = textLines.length * lineHeight;
        const textStartY = overlayY + (overlayHeight / 2) - (totalTextHeight / 2) + (lineHeight / 2);
        
        textLines.forEach((line, index) => {
          const y = textStartY + (index * lineHeight);
          ctx.fillText(line, canvas.width / 2, y);
        });
      }
      
      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `PIN_${formData.pinType}_${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png');
    };
    
    img.onerror = () => {
      console.error('Failed to load image for PNG generation');
      alert('Failed to generate PNG. Please try again.');
    };
    
    // Start loading the image
    img.src = selectedImage.url;
  };

  const handleCancel = () => {
    navigate('/prayer-list');
  };

  // Load Google Fonts when component mounts
  useEffect(() => {
    loadGoogleFonts();
  }, []);

  // Load relevant images when component mounts or prayer context changes
  useEffect(() => {
    if (prayerContext) {
      getRelevantImages();
    }
  }, [prayerContext]);
  
  // Update verse data when prayer context or verse type changes
  useEffect(() => {
    // This will trigger a re-render of the verse grid when context changes
  }, [prayerContext, verseType]);

  // Set default selected image when PIN type changes to Image or Meme
  useEffect(() => {
    if ((formData.pinType === 'Image' || formData.pinType === 'Meme') && relevantImages.length > 0 && !selectedImage) {
      setSelectedImage(relevantImages[0]);
    }
  }, [formData.pinType, relevantImages, selectedImage]);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = '';
      }
    };
  }, [currentAudio]);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Create a PIN</PageTitle>
                 <BackButton onClick={handleCancel}>
           ← Back
         </BackButton>
      </PageHeader>

      {prayerContext && (
        <PrayerContextSection>
          <ContextTitle>Responding to Prayer Request</ContextTitle>
          <ContextDetails>
                         <strong>{prayerContext.name}</strong> - {prayerContext.category} → {prayerContext.subcategory}
          </ContextDetails>
        </PrayerContextSection>
      )}

      <FormSection>
        <SectionTitle>Select PIN Type</SectionTitle>
        <PINTypeGrid>
          {pinTypes.map((type) => (
            <div key={type.value}>
              <RadioInput
                type="radio"
                name="pinType"
                value={type.value}
                checked={formData.pinType === type.value}
                onChange={handleInputChange}
                id={`pinType-${type.value}`}
              />
              <PINTypeOption htmlFor={`pinType-${type.value}`}>
                <PINTypeIcon>{type.icon}</PINTypeIcon>
                <PINTypeText>{type.label}</PINTypeText>
              </PINTypeOption>
            </div>
          ))}
        </PINTypeGrid>
      </FormSection>

      <ContentSection>
        <ContentLabel htmlFor="content">Content</ContentLabel>
        <FontControlsSection>
          <FontSizeControl>
            <FontSizeLabel htmlFor="fontSize">Font Size</FontSizeLabel>
                         <FontSizeSlider
               type="range"
               id="fontSize"
               min="12"
               max="36"
               value={fontSize}
               onChange={handleFontSizeChange}
             />
            <FontSizeValue>{fontSize}px</FontSizeValue>
          </FontSizeControl>
          <FontFamilyControl>
            <FontFamilyLabel htmlFor="fontFamily">Font Family</FontFamilyLabel>
            <FontFamilySelect
              id="fontFamily"
              value={fontFamily}
              onChange={handleFontFamilyChange}
            >
              {GOOGLE_FONTS.map(font => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </FontFamilySelect>
          </FontFamilyControl>
        </FontControlsSection>
                 <ContentTextarea
           id="content"
           name="content"
           placeholder="Share your thoughts, prayer request, or inspiration..."
           value={formData.content}
           onChange={handleInputChange}
         />
      </ContentSection>

             {(formData.pinType === 'Image' || formData.pinType === 'Meme') && (
         <>
           <ImageSliderSection>
             <SliderTitle>Select Relevant Image</SliderTitle>
             <ImageSliderContainer>
               <LeftArrow 
                 onClick={scrollLeft} 
                 disabled={imageSliderIndex === 0}
               >
                 ‹
               </LeftArrow>
                               <ImageSlider>
                  {isLoadingImages ? (
                    <LoadingContainer>
                      Loading relevant images...
                    </LoadingContainer>
                  ) : (
                    relevantImages.map((image, index) => (
                      <SliderImage
                        key={index}
                        className={selectedImage?.url === image.url ? 'selected' : ''}
                        onClick={() => handleImageSelect(image)}
                      >
                        <SliderImageContent src={image.url} alt={image.alt} />
                      </SliderImage>
                    ))
                  )}
                </ImageSlider>
               <RightArrow 
                 onClick={scrollRight} 
                 disabled={imageSliderIndex === relevantImages.length - 1}
               >
                 ›
               </RightArrow>
             </ImageSliderContainer>
           </ImageSliderSection>
         </>
       )}

             {formData.pinType === 'Audio' && (
         <MusicSection>
           <MusicTitle>Select Worship Music</MusicTitle>
           <MusicGrid>
             {musicData.map((music) => (
                               <MusicCard 
                  key={music.id}
                  className={selectedMusicId === music.id ? 'playing' : ''}
                >
                                   <MusicCardHeader>
                    <MusicArtwork src={music.artwork} alt={`${music.artist} artwork`} />
                    <MusicInfo>
                      <SongTitle>{music.title}</SongTitle>
                      <ArtistName>{music.artist}</ArtistName>
                      {selectedMusicId === music.id && (
                        <div style={{ 
                          background: 'rgba(255, 255, 255, 0.2)', 
                          color: 'white', 
                          padding: '4px 8px', 
                          borderRadius: '12px', 
                          fontSize: '11px', 
                          fontWeight: '600',
                          marginTop: '8px',
                          textAlign: 'center'
                        }}>
                          ✓ SELECTED FOR PIN
                        </div>
                      )}
                    </MusicInfo>
                    <MusicTags>
                      {music.tags.map((tag, index) => (
                        <MusicTag key={index}>{tag}</MusicTag>
                      ))}
                    </MusicTags>
                  </MusicCardHeader>
                 
                 <MusicCardBody>
                                       <AudioPlayer>
                      {selectedMusicId === music.id ? (
                        <>
                          <ProgressContainer>
                            <ProgressBar onClick={(e) => handleProgressClick(e, music)}>
                              <ProgressFill 
                                style={{ 
                                  width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` 
                                }} 
                              />
                            </ProgressBar>
                          </ProgressContainer>
                          
                          <TimeDisplay>
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                          </TimeDisplay>
                        </>
                      ) : (
                        <div style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#657786', fontSize: '14px' }}>
                          Click play to select this song
                        </div>
                      )}
                      
                      <ControlButtons>
                        <ControlButton
                          onClick={() => handlePlayMusic(music)}
                          disabled={selectedMusicId === music.id && isPlaying}
                          primary={selectedMusicId === music.id && isPlaying}
                        >
                          ▶️
                        </ControlButton>
                        <ControlButton
                          onClick={handlePauseMusic}
                          disabled={selectedMusicId !== music.id || !isPlaying}
                        >
                          ⏸️
                        </ControlButton>
                        <ControlButton
                          onClick={handleStopMusic}
                          disabled={selectedMusicId !== music.id || !isPlaying}
                        >
                          ⏹️
                        </ControlButton>
                      </ControlButtons>
                    </AudioPlayer>
                   
                   
                 </MusicCardBody>
               </MusicCard>
             ))}
           </MusicGrid>
         </MusicSection>
               )}

        {formData.pinType === 'Verse' && (
          <VerseSection>
            <VerseTitle>Select Bible Verse</VerseTitle>
            <VerseTypeFilter>
              <VerseTypeLabel htmlFor="verseType">Verse Type:</VerseTypeLabel>
              <VerseTypeSelect
                id="verseType"
                value={verseType}
                onChange={handleVerseTypeChange}
              >
                <option value="Dynamic">Dynamic (Background + Text)</option>
                <option value="Classic">Classic (Scripture on Image)</option>
              </VerseTypeSelect>
            </VerseTypeFilter>
            <VerseGrid>
              {getCurrentVerseData().map((verse) => (
                <VerseCard
                  key={verse.id}
                  className={formData.selectedVerse?.id === verse.id ? 'selected' : ''}
                  onClick={() => handleVerseSelect(verse)}
                >
                  <VerseImage 
                    src={verse.image} 
                    alt={verse.title}
                    onError={(e) => {
                      if (verseType === 'Dynamic') {
                        e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop';
                      } else {
                        e.target.src = '/images/verses/VERSE-001.jpg';
                      }
                    }}
                  />
                                     <VerseInfo>
                     <VerseTitleText>{verse.title}</VerseTitleText>
                     <VerseReference>
                       {verseType === 'Dynamic' ? verse.reference : verse.reference}
                     </VerseReference>
                   </VerseInfo>
                </VerseCard>
              ))}
            </VerseGrid>
          </VerseSection>
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
          <SectionTitle>Preview</SectionTitle>
          {(formData.pinType === 'Image' || formData.pinType === 'Meme') && selectedImage ? (
            <OverlayPreview isLoading={isLoadingImages}>
              <BackgroundImage src={selectedImage.url} alt={selectedImage.alt} />
              {formData.content && (
                <TextOverlay>
                  <OverlayText 
                    fontSize={`${fontSize}px`}
                    fontFamily={fontFamily}
                  >
                    {formData.content}
                  </OverlayText>
                </TextOverlay>
              )}
            </OverlayPreview>
          ) : formData.pinType === 'Verse' && formData.selectedVerse ? (
            <div style={{ 
              border: '2px solid #e1e8ed', 
              borderRadius: '12px', 
              overflow: 'hidden',
              background: 'white'
            }}>
                             <img 
                 src={formData.selectedVerse.image} 
                 alt={formData.selectedVerse.title}
                 style={{ 
                   width: '100%', 
                   height: '500px', 
                   objectFit: 'contain',
                   backgroundColor: '#f8f9fa'
                 }} 
               />
                             {verseType === 'Dynamic' && (
                 <div style={{ 
                   padding: '20px', 
                   background: 'rgba(0, 0, 0, 0.8)', 
                   color: 'white',
                   textAlign: 'center'
                 }}>
                   <div style={{ 
                     fontSize: '18px', 
                     fontWeight: '600', 
                     marginBottom: '10px' 
                   }}>
                     {formData.selectedVerse.title}
                   </div>
                   <div style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '15px' }}>
                     {formData.selectedVerse.reference}
                   </div>
                   {formData.content && (
                     <div style={{ 
                       fontSize: '16px', 
                       lineHeight: '1.6',
                       padding: '15px',
                       background: 'rgba(255, 255, 255, 0.1)',
                       borderRadius: '8px',
                       border: '1px solid rgba(255, 255, 255, 0.2)'
                     }}>
                       <strong>Your Message:</strong><br />
                       {formData.content}
                     </div>
                   )}
                   {!formData.content && (
                     <div style={{ fontSize: '14px', lineHeight: '1.6', opacity: '0.8' }}>
                       Add your personal message above to see it overlaid on this image
                     </div>
                   )}
                 </div>
               )}
              {verseType === 'Classic' && formData.content && (
                <div style={{ 
                  padding: '20px', 
                  background: 'rgba(0, 0, 0, 0.8)', 
                  color: 'white',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    marginBottom: '10px' 
                  }}>
                    Additional Notes
                  </div>
                  <div style={{ fontSize: '16px', lineHeight: '1.6' }}>
                    {formData.content}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <PreviewBox>
              {previewUrl ? (
                <ImagePreview src={previewUrl} alt="Preview" />
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '64px', marginBottom: '15px' }}>⛰️☀️</div>
                  <div style={{ fontSize: '18px' }}>Content preview will appear here</div>
                </div>
              )}
            </PreviewBox>
          )}
        </PreviewSection>

             <ActionButtons>
         <SaveButton onClick={handleSave}>
           {(formData.pinType === 'Image' || formData.pinType === 'Meme') && 
            formData.content.trim() && selectedImage 
            ? 'Save as PNG' 
            : 'Save as Draft'}
         </SaveButton>
         <CancelButton onClick={handleCancel}>Cancel</CancelButton>
         <SubmitButton onClick={handleSubmit}>Create PIN</SubmitButton>
       </ActionButtons>
    </PageContainer>
  );
};

export default PINCreationPage;

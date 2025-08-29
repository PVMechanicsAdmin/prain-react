import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 90px 20px 80px 80px;
  min-height: 100vh;
  background: #f5f8fa;
  
  @media (max-width: 767px) {
    padding: 80px 15px 70px 15px;
  }
  
  @media (max-width: 480px) {
    padding: 70px 10px 60px 10px;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;
  
  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  @media (max-width: 767px) {
    gap: 20px;
  }
`;

const BlogSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  
  @media (max-width: 767px) {
    gap: 25px;
  }
  
  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const BlogArticle = styled.article`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 767px) {
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

const ArticleImage = styled.div`
  position: relative;
  height: 300px;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 14px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  @media (max-width: 767px) {
    height: 250px;
  }
  
  @media (max-width: 480px) {
    height: 200px;
  }
`;

const CategoryTag = styled.span`
  position: absolute;
  top: 15px;
  left: 15px;
  background: #60a5fa;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  
  @media (max-width: 767px) {
    font-size: 11px;
    padding: 5px 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 4px 8px;
  }
`;

const SubCategoryTag = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  background: #10b981;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  
  @media (max-width: 767px) {
    font-size: 10px;
    padding: 5px 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 9px;
    padding: 4px 8px;
  }
`;

const ArticleContent = styled.div`
  padding: 25px;
  
  @media (max-width: 767px) {
    padding: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const ArticleTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 10px;
  line-height: 1.3;
  
  @media (max-width: 767px) {
    font-size: 22px;
    margin-bottom: 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 8px;
  }
`;

const ArticleMeta = styled.div`
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  
  @media (max-width: 767px) {
    font-size: 13px;
    gap: 12px;
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    gap: 10px;
    margin-bottom: 10px;
  }
`;

const AuthorInfo = styled.span`
  color: #3b82f6;
  font-weight: 500;
`;

const ArticleExcerpt = styled.p`
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 12px;
  }
`;

const ReadMoreButton = styled(Link)`
  background: #1f2937;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  
  &:hover {
    background: #374151;
  }
  
  @media (max-width: 767px) {
    padding: 10px 20px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 13px;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  
  @media (max-width: 1023px) {
    order: -1;
  }
  
  @media (max-width: 767px) {
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const SidebarSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 767px) {
    padding: 20px;
    border-radius: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const SidebarTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 20px;
  text-transform: uppercase;
  
  @media (max-width: 767px) {
    font-size: 16px;
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 15px;
    margin-bottom: 12px;
  }
`;

const SidebarSearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  margin-bottom: 10px;
  font-size: 14px;
  
  &::placeholder {
    color: #9ca3af;
  }
  
  @media (max-width: 767px) {
    padding: 10px 14px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 10px 12px;
    font-size: 13px;
  }
`;

const SidebarSearchButton = styled.button`
  background: #10b981;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background: #059669;
  }
  
  @media (max-width: 767px) {
    padding: 10px 14px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 13px;
  }
`;

const AdPlaceholder = styled.div`
  border: 2px dashed #d1d5db;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 16px;
  font-weight: 600;
  
  @media (max-width: 767px) {
    height: 150px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    height: 120px;
    font-size: 13px;
  }
`;

const FeaturedArticleImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 8px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
  
  @media (max-width: 767px) {
    height: 150px;
  }
  
  @media (max-width: 480px) {
    height: 120px;
  }
`;

const FeaturedArticleLink = styled(Link)`
  display: block;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const TrendingArticle = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 767px) {
    gap: 12px;
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    gap: 10px;
    margin-bottom: 12px;
  }
`;

const TrendingImage = styled.div`
  width: 80px;
  height: 60px;
  background: #e5e7eb;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 10px;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  @media (max-width: 767px) {
    width: 70px;
    height: 55px;
    font-size: 9px;
  }
  
  @media (max-width: 480px) {
    width: 60px;
    height: 50px;
    font-size: 8px;
  }
`;

const TrendingContent = styled.div`
  flex: 1;
`;

const TrendingTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.4;
  margin: 0;
  
  @media (max-width: 767px) {
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const BlogArticlesPage = () => {
  // In-memory database with only religious/faith-based content
  const [blogArticles] = useState([
    {
      articleId: "addiction-001",
      title: "The Truth About Addiction",
      category: "ADDICTION",
      subCategory: "General",
      author: "PRAIN Team",
      date: "2025-01-15T09:00:00Z",
      imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
      articleText: "Addiction can have a powerful grasp on your life. Sometimes you don't realize it until you become unrecognizable to yourself and others. So how can you break the hold of something that grips so tightly on your life? Is there someone you can trust that will rescue you from the power addiction has over you? There is one who rescues and can break the grip that addiction has over your life: our Lord and Savior Jesus Christ, and He is the answer. He longs for you to place your trust in Him through prayer. Prayer allows you to acknowledge the power needed to break the chains of addiction. We are human and can only do things that are within our ability. Breaking the power of addiction is not one of those things. It is a supernatural thing that only the Lord can do for you. When you pray for God to rescue you from the hold of addiction, you are placing your trust in Him and allowing Him to do His transforming work in you. Believe that He WILL transform you and help you overcome the world as He promised His believers in 1 John 5:4. Prayer allows you to change your mindset from something that can't be done to something that God can do. If you speak words of truth about what God can do, then you will be able to say, 'NO' to the ungodly things of the world like it says Titus 2:11 and live a self-controlled life. Prayer gives you freedom and restoration. He promises to restore us and bring us back when we've gone astray. Living in freedom will bring about true joy and blessings we could never imagine. Why would you ever want to live in bondage when He has promised you this kind of freedom? Lord, You are the only one who can break the stronghold of addiction. It is by Your words and Your promises that we can find freedom and restoration. You are the One who saves. Blessed be Your name."
    },
    {
      articleId: "education-001",
      title: "The Importance of Supporting Our Youths in School and College",
      category: "EDUCATION",
      subCategory: "General",
      author: "PRAIN Team",
      date: "2025-01-20T10:00:00Z",
      imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop",
      articleText: "They indeed say education is the most powerful weapon which you can use to change the world. If everyone has access to education, it will guarantee a better world. In the world today, according to world demography, there is over 1.8 billion youths all over the world. This tells us that the future of the world is in the hands of these young people. There are lots of young people in high school and college. We cannot say because they are in high school or in college means they are good and they don't need help. The number of youths that drop out in schools is increasing – this is because of different things. The reason ranges from poverty, lack of caring parents, unbelieve, and the influence of bad friends. These youths need to be trained and be supported using every available resource. If these youths are not helped and supported, then we are putting the future in danger. The children of today will be the parents of tomorrow. There are different stages of life, there is a stage when we are so small, a toddler, there is a time we become youths, there is a time we get to become an adult and then get into a relationship. God loves everybody irrespective of the age but the stage that God is more interested in is the youth stage. You might be wondering why God is more interested in this stage. This stage is the stage when we start making decisions on our own, it is the time to make choices that will determine the future, it also the time that we prepare for the future. This is also the age when youths make mistakes. If you ask old people now what they will like to get back in their lives – they will ask for the days they were young. So also, if we want to change the world and make it a better place, a place that is safe for everyone to live in, we will have to support and build the youths. Where can we find these youths most? In schools. Jesus was teaching one day, everyone was there listening to him and then children came too, they wanted to listen to Jesus, they desire change in their lives too. People started stopping them and telling them to go back but Jesus replied them in Matthew 19:14 'Suffer little children, and forbid them not, to come unto me: for of such is the kingdom of heaven.' Jesus is interested in the young ones. What is the importance of supporting young ones in schools? 1. It reduces the dropout rate. According to research on the number of youths who dropped out in schools in 2007, about 2.1 million youths dropped out of school. This is because of the lack of support from different people. The majority of these dropouts couldn't continue because they lack the proper motivation needed to keep them going. As Christians, when preaching the gospel, helping the youth should be in our plans. God wants to see us flourish. This world has been under the rule of the evil people for long, we shouldn't step back and let them continue to rule. We should not let our youths fall into these evil acts. We should take them to the schools, our supports. Romans 8:19 'For the earnest expectation of the creature waiteth for the manifestation of the sons of God.' 2. It reduces the suicide rate. It is a pity today that parents and teachers choose to be selectively deaf to the hearts of the youths. The youths are being forced to do the things they don't want to do – they are being forced to take the same test. Nothing about the school has changed in a long time. The curriculum that was used many years ago is still being used in most schools. We have discovered that these frustrations that the students face in schools have led to some youth committing suicide. We need to go into schools and let them know we care about them; we are ready to listen to them. What most of these youths want is an ear that listens to them. 3. For better behavior. When youths are being supported in schools, when a mutual connection is created with them, it makes them learn to behave better. The reason why students go rogue, is because they lack some kind of important connection, a connection like someone to trust, someone to depend on. When there is no one to trust, they seem to hate everyone and this makes them do bad things. When one gets caught up in this habit, they influence others. This is how it spreads. 4. For skill acquisition. The reason why there are lots of failures in schools today is that the students are not being taught how to improve their skills. They were not taught the things they wanted to do. Forcing a student to do things is like a programmed robot who has to do all the command that was given to it – no time to make choice. This thing kills dreams. Taking the belief of helping youths to discover their talents and develop it will bring a great change to their lives and the world."
    },
    {
      articleId: "faith-001",
      title: "Building Stronger Faith Through Daily Prayer",
      category: "FAITH",
      subCategory: "Spiritual Growth",
      author: "Sarah Johnson",
      date: "2025-01-10T08:00:00Z",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
      articleText: "Daily prayer is the cornerstone of a strong spiritual foundation. When we commit to spending time with God each day, we open ourselves to His guidance, strength, and peace. Prayer isn't just about asking for things - it's about building a relationship with our Creator. Through consistent prayer, we develop a deeper understanding of God's character and His plans for our lives. The more we pray, the more we recognize His voice and the more confident we become in our faith journey. Remember, prayer is a conversation, not a monologue. Take time to listen as well as speak."
    },
    {
      articleId: "community-001",
      title: "The Power of Christian Community",
      category: "COMMUNITY",
      subCategory: "Fellowship",
      author: "Michael Chen",
      date: "2025-01-05T14:30:00Z",
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
      articleText: "Christian community is more than just attending church services together. It's about building genuine relationships that support, encourage, and challenge us to grow in our faith. When we surround ourselves with fellow believers, we create a network of accountability and love that helps us navigate life's challenges. The early church thrived because believers were committed to one another, sharing resources, praying together, and supporting each other through difficult times. In today's world, this kind of community is more important than ever."
    },
    {
      articleId: "prayer-001",
      title: "The Transformative Power of Intercessory Prayer",
      category: "PRAYER",
      subCategory: "Intercession",
      author: "David Thompson",
      date: "2025-01-12T11:00:00Z",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
      articleText: "Intercessory prayer is one of the most powerful ways we can serve others and participate in God's work on earth. When we stand in the gap for others through prayer, we are partnering with God to bring His kingdom purposes to fruition. The Bible is filled with examples of intercessors like Moses, who pleaded for the Israelites, and Jesus, who continues to intercede for us at the right hand of the Father. Intercessory prayer requires faith, persistence, and a heart that beats with God's compassion for others. It's not about changing God's mind, but about aligning our hearts with His will and participating in the spiritual battle for souls. When we pray for others, we are exercising our spiritual authority and declaring God's promises over their lives. This type of prayer ministry can break strongholds, bring healing, and open doors that no human effort could accomplish."
    },
    {
      articleId: "employment-001",
      title: "Finding a Job in This Market",
      category: "EMPLOYMENT",
      subCategory: "Finding a Job",
      author: "PRAIN Team",
      date: "2025-01-25T13:00:00Z",
      imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=400&fit=crop",
      articleText: "Whatever you do, whether in word or deed, do it all for the Lord. Maybe you have heard this scripture from Colossians 3:23. This is God's desire for us in every area of our lives, but especially in our jobs. However, finding a job, especially the job you want, can be a difficult task. Sometimes it can feel like an endless game of hide and seek with little success. This is where prayer and trust in the Lord comes in. Every part of the job hunt can be stressful. When you trust in the Lord, you allow Him to cover you with His peace. These three types of prayers can help bring about that peace as you search for the job you want.\n\n1. Pray for the Lord to lead you in your search for a job. He knows what you need, sometimes even before you know what you need! He also knows what's best for you in every situation. Who better to lead you than the one who sees your future? 1 Corinthians 13:12 says that now we only see dimly as in a mirror, we only know in part. We can only see the here and now. Trust in the one who can see every moment of your story.\n\n2. Pray for an opportunity to serve Him in your job search and especially after you find a job. Whether it's delivering pizzas for a short time to pay the bills or a career that you want, pray that you will be able to devote yourself to Him daily and commit to Him whatever you do, and your plans will succeed as it states in Proverbs 16:3.\n\n3. Pray for him to give you the skills you need to be successful and honor Him with those skills. Ephesians 2:10 tells us that we are created in His image, to do the work He calls us to do, so He will equip us to do the work and bring honor to Him.\n\nLord, prepare us for the work you've called us to do and lead us to the job you would have for us. We want to bring honor to you with the skills you've given us, so equip us for the good works you want us to do."
    },
    {
      articleId: "saving-destinies-001",
      title: "Saving Destinies: Advocating for the Right to Life",
      category: "LIFE",
      subCategory: "Pro-Life Advocacy",
      author: "PRAIN Team",
      date: "2025-01-30T14:00:00Z",
      imageUrl: "/images/ads/adv-savedest-banner-large.png",
      articleText: "In a world where the sanctity of human life is increasingly challenged, organizations like Saving Destinies stand as beacons of hope and advocacy for the most vulnerable among us. Their mission resonates deeply with the biblical principle that every human being is created in the image of God and deserves protection, dignity, and the right to life.\n\nOUR MISSION IS RAISING AND UNITING A DIVERSE EXPANSE OF INDIVIDUALS DEDICATED TO THE ISSUE OF THE RIGHT TO LIFE FOR EVERY HUMAN BEING BORN, UNBORN, DISABLED, AGED, OR DEFENSELESS.\n\nThis powerful mission statement encapsulates the heart of what it means to be pro-life in the truest sense. It's not just about protecting the unborn, but about advocating for every human being who may be vulnerable or marginalized in our society.\n\nThe Bible teaches us in Psalm 139:13-16 that God knows us intimately even before we are born: 'For you created my inmost being; you knit me together in my mother's womb. I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well. My frame was not hidden from you when I was made in the secret place, when I was woven together in the depths of the earth. Your eyes saw my unformed body; all the days ordained for me were written in your book before one of them came to be.'\n\nThis scripture reminds us that every life has intrinsic value and purpose, regardless of age, ability, or circumstances. The mission of Saving Destinies aligns perfectly with this biblical truth, recognizing that:\n\n1. Every unborn child deserves protection and the right to life\n2. Individuals with disabilities have inherent dignity and worth\n3. The elderly deserve respect and care in their golden years\n4. All defenseless people need advocates to speak for them\n\nAs Christians, we are called to be the voice for the voiceless and to defend the rights of the oppressed. Proverbs 31:8-9 instructs us: 'Speak up for those who cannot speak for themselves, for the rights of all who are destitute. Speak up and judge fairly; defend the rights of the poor and needy.'\n\nSaving Destinies embodies this calling by uniting diverse individuals from all walks of life who share a common commitment to protecting human dignity. Their work reminds us that being pro-life is not just a political stance—it's a moral imperative rooted in our faith and our understanding of human worth.\n\nIn a culture that often measures human value by productivity, ability, or convenience, organizations like Saving Destinies remind us that every human being has immeasurable worth simply because they are created in God's image. This truth transcends political boundaries and calls us to action in defense of the most vulnerable among us.\n\nAs we reflect on the mission of Saving Destinies, let us remember that advocating for life is not just about preventing harm—it's about actively promoting the flourishing of every human being. It's about creating a world where every person, regardless of their circumstances, is valued, protected, and given the opportunity to fulfill their God-given potential.\n\nMay we all be inspired by their mission to become better advocates for life in our own communities, speaking up for those who cannot speak for themselves, and working to create a culture that truly values and protects every human being."
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState(blogArticles);

  // Filter articles based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredArticles(blogArticles);
    } else {
      const filtered = blogArticles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.subCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.articleText.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  }, [searchTerm, blogArticles]);

  // Get trending articles (most recent 4)
  const trendingArticles = blogArticles
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get excerpt from article text
  const getExcerpt = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Generate placeholder image if URL is not accessible
  const getImageDisplay = (imageUrl, fallbackEmoji) => {
    if (imageUrl && imageUrl.startsWith('http')) {
      return {
        backgroundImage: `url(${imageUrl})`,
        fallback: null
      };
    }
    return {
      backgroundImage: 'none',
      fallback: fallbackEmoji
    };
  };

  return (
    <PageContainer>
      <MainContent>
        <BlogSection>
          {filteredArticles.map((article) => {
            const imageDisplay = getImageDisplay(article.imageUrl, '📖');
            return (
              <BlogArticle key={article.articleId}>
                <ArticleImage 
                  style={{ backgroundImage: imageDisplay.backgroundImage }}
                >
                  {imageDisplay.fallback && (
                    <span style={{ fontSize: '48px' }}>{imageDisplay.fallback}</span>
                  )}
                  <CategoryTag>{article.category}</CategoryTag>
                  <SubCategoryTag>{article.subCategory}</SubCategoryTag>
                </ArticleImage>
                <ArticleContent>
                  <ArticleTitle>{article.title}</ArticleTitle>
                  <ArticleMeta>
                    <span>PRAIN Network</span>
                    <span>•</span>
                    <span>{formatDate(article.date)}</span>
                    <span>•</span>
                    <AuthorInfo>By {article.author}</AuthorInfo>
                  </ArticleMeta>
                  <ArticleExcerpt>
                    {getExcerpt(article.articleText)}
                  </ArticleExcerpt>
                  <ReadMoreButton to={`/blog/${article.articleId}`}>
                    Read More
                  </ReadMoreButton>
                </ArticleContent>
              </BlogArticle>
            );
          })}
        </BlogSection>

        <Sidebar>
          <SidebarSection>
            <SidebarTitle>Search</SidebarTitle>
            <SidebarSearchInput 
              placeholder="Enter keyword..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SidebarSearchButton>
              🔍 Search
            </SidebarSearchButton>
          </SidebarSection>

          <SidebarSection>
            <SidebarTitle>Follow Us</SidebarTitle>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Stay connected with our latest updates and inspirational content.
            </p>
          </SidebarSection>

          <SidebarSection>
            <SidebarTitle>Featured Article</SidebarTitle>
            <FeaturedArticleLink to="/blog/saving-destinies-001">
              <FeaturedArticleImage>
                <img src="/images/ads/adv-savedest-banner.png" alt="Featured Article" />
              </FeaturedArticleImage>
            </FeaturedArticleLink>
          </SidebarSection>

          <SidebarSection>
            <SidebarTitle>Trending</SidebarTitle>
            {trendingArticles.map((article) => {
              const imageDisplay = getImageDisplay(article.imageUrl, '📖');
              return (
                <TrendingArticle key={article.articleId}>
                  <TrendingImage 
                    style={{ backgroundImage: imageDisplay.backgroundImage }}
                  >
                    {imageDisplay.fallback && (
                      <span style={{ fontSize: '16px' }}>{imageDisplay.fallback}</span>
                    )}
                  </TrendingImage>
                  <TrendingContent>
                    <TrendingTitle>{article.title}</TrendingTitle>
                  </TrendingContent>
                </TrendingArticle>
              );
            })}
          </SidebarSection>
        </Sidebar>
      </MainContent>
    </PageContainer>
  );
};

export default BlogArticlesPage;



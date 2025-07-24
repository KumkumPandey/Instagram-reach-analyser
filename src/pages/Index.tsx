import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Heart, MessageCircle, Share2, Eye, Target, Brain, Star, ThumbsUp, ArrowUp, ArrowDown, Zap, Instagram, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [selectedMetric, setSelectedMetric] = useState('reach');
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [animationTrigger, setAnimationTrigger] = useState(false);

  // User input states
  const [userInputs, setUserInputs] = useState({
    dailyHours: '',
    postsViewed: '',
    reelsScrolled: '',
    storiesWatched: '',
    likesGiven: '',
    commentsPosted: ''
  });

  const [analyticsCalculated, setAnalyticsCalculated] = useState(false);
  const [userAnalytics, setUserAnalytics] = useState(null);

  // Sample data for analytics
  const reachData = [
    { date: 'Mon', reach: 1200, engagement: 85, impressions: 1500 },
    { date: 'Tue', reach: 1800, engagement: 120, impressions: 2200 },
    { date: 'Wed', reach: 2400, engagement: 180, impressions: 2800 },
    { date: 'Thu', reach: 2100, engagement: 150, impressions: 2500 },
    { date: 'Fri', reach: 3200, engagement: 240, impressions: 3800 },
    { date: 'Sat', reach: 4100, engagement: 320, impressions: 4800 },
    { date: 'Sun', reach: 3800, engagement: 280, impressions: 4200 },
  ];

  const audienceData = [
    { name: '18-24', value: 35, color: '#E1306C' },
    { name: '25-34', value: 45, color: '#F56040' },
    { name: '35-44', value: 15, color: '#FCAF45' },
    { name: '45+', value: 5, color: '#405DE6' },
  ];

  const contentPerformance = [
    { type: 'Photos', engagement: 85, reach: 2400 },
    { type: 'Videos', engagement: 120, reach: 3200 },
    { type: 'Reels', engagement: 180, reach: 4100 },
    { type: 'Stories', engagement: 95, reach: 1800 },
  ];

  const mlInsights = [
    { 
      type: 'Best Posting Time', 
      insight: '7-9 PM gets 40% more engagement',
      confidence: 92,
      icon: <Target className="w-4 h-4" />
    },
    { 
      type: 'Content Prediction', 
      insight: 'Video content will increase reach by 25%',
      confidence: 87,
      icon: <Brain className="w-4 h-4" />
    },
    { 
      type: 'Hashtag Optimization', 
      insight: 'Use 8-12 hashtags for maximum reach',
      confidence: 89,
      icon: <TrendingUp className="w-4 h-4" />
    },
    { 
      type: 'Audience Growth', 
      insight: 'Expect 15% growth in next 30 days',
      confidence: 94,
      icon: <Users className="w-4 h-4" />
    },
  ];

  useEffect(() => {
    setAnimationTrigger(true);
    toast.success("Instagram Reach Analyzer Loaded Successfully!");
  }, []);

  const handleInputChange = (field, value) => {
    setUserInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateUserAnalytics = () => {
    const hours = parseFloat(userInputs.dailyHours) || 0;
    const posts = parseInt(userInputs.postsViewed) || 0;
    const reels = parseInt(userInputs.reelsScrolled) || 0;
    const stories = parseInt(userInputs.storiesWatched) || 0;
    const likes = parseInt(userInputs.likesGiven) || 0;
    const comments = parseInt(userInputs.commentsPosted) || 0;

    if (hours === 0 && posts === 0 && reels === 0) {
      toast.error("Please enter at least your daily hours or content viewed!");
      return;
    }

    // Calculate engagement score based on user activity
    const engagementScore = Math.min((likes * 2 + comments * 5 + posts * 0.5 + reels * 0.3) / 10, 100);
    const productivityScore = Math.max(100 - (hours * 15), 0);
    const contentConsumption = posts + reels + stories;

    setAnalyticsCalculated(true);
    toast.success("Your Instagram usage analysis is ready!");

    setUserAnalytics({
      engagementScore,
      productivityScore,
      contentConsumption,
      weeklyHours: hours * 7,
      averageSession: hours > 0 ? (hours * 60) / 5 : 0 // Assuming 5 sessions per day
    });
  };

  const StatCard = ({ title, value, change, icon, color }) => (
    <Card className={`transform transition-all duration-300 hover:scale-105 hover:shadow-lg ${animationTrigger ? 'animate-fade-in' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value.toLocaleString()}</p>
            <div className={`flex items-center mt-1 text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
              {Math.abs(change)}%
            </div>
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const FeedbackSection = () => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          User Experience Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Rate your experience:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => {
                    setFeedbackRating(star);
                    toast.success(`Thank you for rating ${star} stars!`);
                  }}
                  className={`w-6 h-6 ${star <= feedbackRating ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                >
                  <Star className="w-full h-full fill-current" />
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => toast.success("Feedback sent! Thank you!")}
              className="flex items-center gap-1"
            >
              <ThumbsUp className="w-4 h-4" />
              Helpful
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.info("We'll improve based on your feedback!")}
            >
              Suggest Improvement
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Instagram className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Instagram Reach Analyzer</h1>
                <p className="text-white/90">AI-Powered Social Media Analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                <Zap className="w-4 h-4 mr-1" />
                ML Powered
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* User Input Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Activity className="w-6 h-6 text-purple-600" />
              Enter Your Daily Instagram Usage
            </CardTitle>
            <p className="text-muted-foreground">
              Input your daily activity to get personalized analytics and insights
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dailyHours">Daily Hours Spent</Label>
                <Input
                  id="dailyHours"
                  type="number"
                  step="0.5"
                  placeholder="e.g., 2.5"
                  value={userInputs.dailyHours}
                  onChange={(e) => handleInputChange('dailyHours', e.target.value)}
                  className="border-purple-200 focus:border-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postsViewed">Posts Viewed Daily</Label>
                <Input
                  id="postsViewed"
                  type="number"
                  placeholder="e.g., 50"
                  value={userInputs.postsViewed}
                  onChange={(e) => handleInputChange('postsViewed', e.target.value)}
                  className="border-purple-200 focus:border-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reelsScrolled">Reels Scrolled Daily</Label>
                <Input
                  id="reelsScrolled"
                  type="number"
                  placeholder="e.g., 30"
                  value={userInputs.reelsScrolled}
                  onChange={(e) => handleInputChange('reelsScrolled', e.target.value)}
                  className="border-purple-200 focus:border-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storiesWatched">Stories Watched Daily</Label>
                <Input
                  id="storiesWatched"
                  type="number"
                  placeholder="e.g., 15"
                  value={userInputs.storiesWatched}
                  onChange={(e) => handleInputChange('storiesWatched', e.target.value)}
                  className="border-purple-200 focus:border-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="likesGiven">Likes Given Daily</Label>
                <Input
                  id="likesGiven"
                  type="number"
                  placeholder="e.g., 25"
                  value={userInputs.likesGiven}
                  onChange={(e) => handleInputChange('likesGiven', e.target.value)}
                  className="border-purple-200 focus:border-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="commentsPosted">Comments Posted Daily</Label>
                <Input
                  id="commentsPosted"
                  type="number"
                  placeholder="e.g., 5"
                  value={userInputs.commentsPosted}
                  onChange={(e) => handleInputChange('commentsPosted', e.target.value)}
                  className="border-purple-200 focus:border-purple-500"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <Button 
                onClick={calculateUserAnalytics}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analyze My Usage
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setUserInputs({
                    dailyHours: '',
                    postsViewed: '',
                    reelsScrolled: '',
                    storiesWatched: '',
                    likesGiven: '',
                    commentsPosted: ''
                  });
                  setAnalyticsCalculated(false);
                  setUserAnalytics(null);
                  toast.info("Input fields cleared!");
                }}
                className="border-purple-200 hover:bg-purple-50"
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User Analytics Results */}
        {analyticsCalculated && userAnalytics && (
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Target className="w-6 h-6" />
                Your Personal Instagram Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/80 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Engagement Score</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {userAnalytics.engagementScore.toFixed(1)}/100
                  </div>
                  <Progress value={userAnalytics.engagementScore} className="mt-2" />
                </div>
                <div className="bg-white/80 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Productivity Score</div>
                  <div className="text-2xl font-bold text-green-600">
                    {userAnalytics.productivityScore.toFixed(1)}/100
                  </div>
                  <Progress value={userAnalytics.productivityScore} className="mt-2" />
                </div>
                <div className="bg-white/80 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Weekly Hours</div>
                  <div className="text-2xl font-bold text-orange-600">
                    {userAnalytics.weeklyHours.toFixed(1)}h
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {userAnalytics.weeklyHours > 21 ? 'High usage' : 'Moderate usage'}
                  </div>
                </div>
                <div className="bg-white/80 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Avg Session</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {userAnalytics.averageSession.toFixed(0)}min
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Per session time
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white/60 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Personalized Recommendations:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {userAnalytics.weeklyHours > 21 && (
                    <li>• Consider reducing daily usage by 30 minutes for better productivity</li>
                  )}
                  {userAnalytics.engagementScore < 30 && (
                    <li>• Try engaging more with content through likes and comments</li>
                  )}
                  {userAnalytics.productivityScore > 70 && (
                    <li>• Great job maintaining healthy Instagram usage habits!</li>
                  )}
                  <li>• Your most active content type: {parseInt(userInputs.reelsScrolled) > parseInt(userInputs.postsViewed) ? 'Reels' : 'Posts'}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Reach"
            value={18600}
            change={25.3}
            icon={<Eye className="w-6 h-6 text-white" />}
            color="bg-gradient-to-r from-blue-500 to-purple-600"
          />
          <StatCard
            title="Engagement Rate"
            value={8.7}
            change={12.5}
            icon={<Heart className="w-6 h-6 text-white" />}
            color="bg-gradient-to-r from-pink-500 to-red-500"
          />
          <StatCard
            title="New Followers"
            value={1240}
            change={18.2}
            icon={<Users className="w-6 h-6 text-white" />}
            color="bg-gradient-to-r from-green-500 to-teal-500"
          />
          <StatCard
            title="Impressions"
            value={24800}
            change={22.1}
            icon={<BarChart3 className="w-6 h-6 text-white" />}
            color="bg-gradient-to-r from-orange-500 to-yellow-500"
          />
        </div>

        {/* Main Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="audience" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Audience
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              AI Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reach & Engagement Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={reachData}>
                      <defs>
                        <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="reach" stroke="#8884d8" fill="url(#reachGradient)" />
                      <Area type="monotone" dataKey="engagement" stroke="#82ca9d" fill="url(#engagementGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={reachData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="impressions" stroke="#ff7c7c" strokeWidth={3} />
                      <Line type="monotone" dataKey="reach" stroke="#8884d8" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audience" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Audience Demographics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={audienceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {audienceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {audienceData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm">{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Followers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Alex Johnson', handle: '@alexj', followers: '12.5K', avatar: '/placeholder.svg' },
                      { name: 'Sarah Wilson', handle: '@sarahw', followers: '8.3K', avatar: '/placeholder.svg' },
                      { name: 'Mike Chen', handle: '@mikec', followers: '6.7K', avatar: '/placeholder.svg' },
                      { name: 'Emma Davis', handle: '@emmad', followers: '5.2K', avatar: '/placeholder.svg' },
                    ].map((follower, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={follower.avatar} />
                            <AvatarFallback>{follower.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{follower.name}</p>
                            <p className="text-sm text-muted-foreground">{follower.handle}</p>
                          </div>
                        </div>
                        <Badge variant="secondary">{follower.followers}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Performance by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={contentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="engagement" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="reach" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mlInsights.map((insight, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white">
                        {insight.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{insight.type}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{insight.insight}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Confidence:</span>
                          <Progress value={insight.confidence} className="flex-1 h-2" />
                          <span className="text-xs font-medium">{insight.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* User Feedback Section */}
        <FeedbackSection />
      </div>
    </div>
  );
};

export default Index;
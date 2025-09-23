import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { PlusIcon, GripVerticalIcon, XIcon, FileTextIcon, PlayIcon, HelpCircleIcon, ImageIcon, LinkIcon, SaveIcon, EyeIcon, CheckCircleIcon, UploadIcon, ArrowLeftIcon, ArrowRightIcon, TrashIcon, TagIcon, UsersIcon, UserIcon, FolderIcon, InfoIcon } from 'lucide-react';
import { toast } from 'react-toastify';
type ContentSection = {
  id: string;
  title: string;
  type: 'text' | 'video' | 'quiz' | 'image' | 'file';
  content: any;
  order: number;
};
const ModuleBuilderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const moduleId = searchParams.get('id');
  const isEditing = !!moduleId;
  const isAdmin = location.pathname.startsWith('/admin');
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [moduleTags, setModuleTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [moduleObjectives, setModuleObjectives] = useState(['']);
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('editor');
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(null);
  // Sample departments and roles for assignment
  const departments = ['Sales', 'Marketing', 'Customer Success', 'Support'];
  const roles = ['Sales Representative', 'Senior Sales Representative', 'Account Executive', 'Senior Account Executive', 'Sales Manager'];
  // Mock data for editing
  const mockModuleData = {
    id: '1',
    title: 'Sales Methodology Fundamentals',
    description: 'Learn the core principles of our sales methodology and how to apply them in various scenarios.',
    objectives: ['Understand the key principles of our sales methodology', 'Apply the methodology to different customer scenarios', 'Identify opportunities to use the methodology in the sales process'],
    tags: ['sales', 'methodology', 'fundamentals'],
    departments: ['Sales'],
    roles: ['Sales Representative', 'Senior Sales Representative'],
    sections: [{
      id: 'section-1',
      title: 'Introduction to Sales Methodology',
      type: 'text' as 'text',
      content: 'Our sales methodology is based on a consultative approach that focuses on understanding customer needs before proposing solutions.',
      order: 0
    }, {
      id: 'section-2',
      title: 'Key Principles Video',
      type: 'video' as 'video',
      content: 'https://example.com/sales-methodology-video.mp4',
      order: 1
    }, {
      id: 'section-3',
      title: 'Methodology Quiz',
      type: 'quiz' as 'quiz',
      content: [{
        question: 'What is the first step in our sales methodology?',
        options: ['Pitch the product', 'Understand customer needs', 'Discuss pricing', 'Show a demo'],
        correctAnswer: 1
      }, {
        question: 'When should you introduce pricing in the sales conversation?',
        options: ['At the beginning', 'After establishing value', 'When the customer asks', 'At the very end'],
        correctAnswer: 1
      }],
      order: 2
    }]
  };
  // Load module data if editing
  useEffect(() => {
    if (isEditing && moduleId) {
      // In a real app, you would fetch the module data from your API
      // For this example, we'll use mock data
      const moduleData = mockModuleData;
      setModuleTitle(moduleData.title);
      setModuleDescription(moduleData.description);
      setModuleObjectives(moduleData.objectives);
      setModuleTags(moduleData.tags);
      setSections(moduleData.sections);
      setSelectedDepartments(moduleData.departments || []);
      setSelectedRoles(moduleData.roles || []);
    }
  }, [isEditing, moduleId]);
  // Handle module objectives
  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...moduleObjectives];
    newObjectives[index] = value;
    setModuleObjectives(newObjectives);
  };
  const addObjective = () => {
    setModuleObjectives([...moduleObjectives, '']);
  };
  const removeObjective = (index: number) => {
    const newObjectives = moduleObjectives.filter((_, i) => i !== index);
    setModuleObjectives(newObjectives);
  };
  // Handle tags
  const addTag = () => {
    if (tagInput.trim() && !moduleTags.includes(tagInput.trim())) {
      setModuleTags([...moduleTags, tagInput.trim()]);
      setTagInput('');
    }
  };
  const removeTag = (tag: string) => {
    setModuleTags(moduleTags.filter(t => t !== tag));
  };
  // Handle sections
  const addSection = (type: ContentSection['type']) => {
    const newSection: ContentSection = {
      id: `section-${Date.now()}`,
      title: `New ${type} section`,
      type,
      content: type === 'quiz' ? [{
        question: '',
        options: ['', ''],
        correctAnswer: 0
      }] : '',
      order: sections.length
    };
    setSections([...sections, newSection]);
    setCurrentSectionIndex(sections.length);
  };
  const updateSection = (index: number, updates: Partial<ContentSection>) => {
    const updatedSections = [...sections];
    updatedSections[index] = {
      ...updatedSections[index],
      ...updates
    };
    setSections(updatedSections);
  };
  const removeSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
    setCurrentSectionIndex(null);
  };
  const moveSection = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= sections.length) return;
    const newSections = [...sections];
    const [movedSection] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, movedSection);
    // Update order
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index
    }));
    setSections(updatedSections);
    setCurrentSectionIndex(toIndex);
  };
  // Handle quiz questions
  const addQuestion = (sectionIndex: number) => {
    const section = sections[sectionIndex];
    if (section.type !== 'quiz') return;
    const newContent = [...section.content, {
      question: '',
      options: ['', ''],
      correctAnswer: 0
    }];
    updateSection(sectionIndex, {
      content: newContent
    });
  };
  const updateQuestion = (sectionIndex: number, questionIndex: number, updates: any) => {
    const section = sections[sectionIndex];
    if (section.type !== 'quiz') return;
    const newContent = [...section.content];
    newContent[questionIndex] = {
      ...newContent[questionIndex],
      ...updates
    };
    updateSection(sectionIndex, {
      content: newContent
    });
  };
  const addQuestionOption = (sectionIndex: number, questionIndex: number) => {
    const section = sections[sectionIndex];
    if (section.type !== 'quiz') return;
    const newContent = [...section.content];
    newContent[questionIndex].options.push('');
    updateSection(sectionIndex, {
      content: newContent
    });
  };
  const removeQuestion = (sectionIndex: number, questionIndex: number) => {
    const section = sections[sectionIndex];
    if (section.type !== 'quiz') return;
    const newContent = section.content.filter((_, i) => i !== questionIndex);
    updateSection(sectionIndex, {
      content: newContent
    });
  };
  // Toggle department selection
  const toggleDepartment = (department: string) => {
    if (selectedDepartments.includes(department)) {
      setSelectedDepartments(selectedDepartments.filter(d => d !== department));
    } else {
      setSelectedDepartments([...selectedDepartments, department]);
    }
  };
  // Toggle role selection
  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };
  // Save module
  const saveModule = (status: 'draft' | 'published') => {
    if (!moduleTitle.trim()) {
      toast.error('Module title is required');
      return;
    }
    if (sections.length === 0) {
      toast.error('Module must have at least one content section');
      return;
    }
    const moduleData = {
      id: moduleId || Date.now().toString(),
      title: moduleTitle,
      description: moduleDescription,
      objectives: moduleObjectives.filter(o => o.trim()),
      tags: moduleTags,
      sections,
      departments: selectedDepartments,
      roles: selectedRoles,
      status
    };
    console.log('Saving module:', moduleData);
    toast.success(`Module ${status === 'published' ? 'published' : 'saved as draft'}`);
    // In a real app, you would send this data to your API
    // For now, we'll just navigate back to the content library
    navigate(isAdmin ? '/admin/content' : '/manager/content');
  };
  // Preview module
  const previewModule = () => {
    setActiveTab('preview');
  };
  // Cancel module creation/editing
  const cancelModule = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      navigate(isAdmin ? '/admin/content' : '/manager/content');
    }
  };
  // Render section editor based on type
  const renderSectionEditor = (section: ContentSection, index: number) => {
    switch (section.type) {
      case 'text':
        return <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-64" value={section.content} onChange={e => updateSection(index, {
            content: e.target.value
          })} placeholder="Enter text content here..."></textarea>
          </div>;
      case 'video':
        return <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video URL
            </label>
            <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" value={section.content} onChange={e => updateSection(index, {
            content: e.target.value
          })} placeholder="Enter video URL (YouTube, Vimeo, etc.)" />
            {section.content && <div className="mt-4 aspect-video bg-gray-100 flex items-center justify-center rounded-md">
                <PlayIcon className="h-12 w-12 text-gray-400" />
              </div>}
          </div>;
      case 'quiz':
        return <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Quiz Questions</h3>
              <button type="button" onClick={() => addQuestion(index)} className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Question
              </button>
            </div>
            {section.content.map((question: any, qIndex: number) => <div key={qIndex} className="mb-6 p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-md font-medium">Question {qIndex + 1}</h4>
                  <button type="button" onClick={() => removeQuestion(index, qIndex)} className="text-red-500 hover:text-red-700">
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question
                  </label>
                  <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" value={question.question} onChange={e => updateQuestion(index, qIndex, {
                question: e.target.value
              })} placeholder="Enter question" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Options
                  </label>
                  {question.options.map((option: string, oIndex: number) => <div key={oIndex} className="flex items-center mb-2">
                      <input type="radio" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" checked={question.correctAnswer === oIndex} onChange={() => updateQuestion(index, qIndex, {
                  correctAnswer: oIndex
                })} />
                      <input type="text" className="ml-2 flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" value={option} onChange={e => {
                  const newOptions = [...question.options];
                  newOptions[oIndex] = e.target.value;
                  updateQuestion(index, qIndex, {
                    options: newOptions
                  });
                }} placeholder={`Option ${oIndex + 1}`} />
                      {question.options.length > 2 && <button type="button" onClick={() => {
                  const newOptions = question.options.filter((_: any, i: number) => i !== oIndex);
                  const newCorrectAnswer = question.correctAnswer === oIndex ? 0 : question.correctAnswer > oIndex ? question.correctAnswer - 1 : question.correctAnswer;
                  updateQuestion(index, qIndex, {
                    options: newOptions,
                    correctAnswer: newCorrectAnswer
                  });
                }} className="ml-2 text-red-500 hover:text-red-700">
                          <XIcon className="h-5 w-5" />
                        </button>}
                    </div>)}
                  <button type="button" onClick={() => addQuestionOption(index, qIndex)} className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Option
                  </button>
                </div>
              </div>)}
            {section.content.length === 0 && <div className="text-center py-8 bg-gray-50 rounded-md">
                <HelpCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">
                  No questions yet. Click "Add Question" to create a quiz.
                </p>
              </div>}
          </div>;
      case 'image':
        return <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" value={section.content} onChange={e => updateSection(index, {
            content: e.target.value
          })} placeholder="Enter image URL" />
            <div className="mt-4 flex items-center justify-center">
              {section.content ? <img src={section.content} alt="Content preview" className="max-h-64 rounded-md" onError={e => {
              ;
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Preview';
            }} /> : <div className="h-64 w-full bg-gray-100 flex items-center justify-center rounded-md">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                </div>}
            </div>
          </div>;
      case 'file':
        return <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              File URL
            </label>
            <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" value={section.content} onChange={e => updateSection(index, {
            content: e.target.value
          })} placeholder="Enter file URL (PDF, DOCX, etc.)" />
            <div className="mt-4">
              <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <UploadIcon className="h-5 w-5 mr-2" />
                Upload File
              </button>
            </div>
          </div>;
      default:
        return null;
    }
  };
  // Render module preview
  const renderModulePreview = () => {
    return <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-4">
          {moduleTitle || 'Untitled Module'}
        </h1>
        {moduleDescription && <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Description</h2>
            <p className="text-gray-700">{moduleDescription}</p>
          </div>}
        {moduleObjectives.filter(o => o.trim()).length > 0 && <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Learning Objectives</h2>
            <ul className="list-disc pl-5 space-y-1">
              {moduleObjectives.filter(o => o.trim()).map((objective, index) => <li key={index} className="text-gray-700">
                    {objective}
                  </li>)}
            </ul>
          </div>}
        {(selectedDepartments.length > 0 || selectedRoles.length > 0) && <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-medium mb-3">Assigned To</h2>
            {selectedDepartments.length > 0 && <div className="mb-3">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Departments:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDepartments.map(dept => <span key={dept} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                      <FolderIcon className="h-3 w-3 mr-1" />
                      {dept}
                    </span>)}
                </div>
              </div>}
            {selectedRoles.length > 0 && <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Roles:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRoles.map(role => <span key={role} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                      <UserIcon className="h-3 w-3 mr-1" />
                      {role}
                    </span>)}
                </div>
              </div>}
          </div>}
        {sections.length > 0 && <div>
            <h2 className="text-lg font-medium mb-4">Content</h2>
            <div className="space-y-6">
              {sections.map((section, index) => <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 flex items-center">
                    {section.type === 'text' && <FileTextIcon className="h-5 w-5 text-blue-500 mr-2" />}
                    {section.type === 'video' && <PlayIcon className="h-5 w-5 text-red-500 mr-2" />}
                    {section.type === 'quiz' && <HelpCircleIcon className="h-5 w-5 text-purple-500 mr-2" />}
                    {section.type === 'image' && <ImageIcon className="h-5 w-5 text-green-500 mr-2" />}
                    {section.type === 'file' && <FileTextIcon className="h-5 w-5 text-orange-500 mr-2" />}
                    <h3 className="font-medium">{section.title}</h3>
                  </div>
                  <div className="p-4">
                    {section.type === 'text' && <div className="prose max-w-none">{section.content}</div>}
                    {section.type === 'video' && <div className="aspect-video bg-gray-100 flex items-center justify-center rounded-md">
                        <PlayIcon className="h-12 w-12 text-gray-400" />
                        <span className="ml-2 text-gray-500">
                          Video content will appear here
                        </span>
                      </div>}
                    {section.type === 'quiz' && <div>
                        {section.content.length > 0 ? <div className="space-y-4">
                            {section.content.map((question: any, qIndex: number) => <div key={qIndex} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                                  <p className="font-medium mb-2">
                                    {qIndex + 1}.{' '}
                                    {question.question || 'Untitled question'}
                                  </p>
                                  <div className="space-y-2 ml-5">
                                    {question.options.map((option: string, oIndex: number) => <div key={oIndex} className="flex items-center">
                                          <input type="radio" name={`question-${qIndex}`} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" disabled />
                                          <span className="ml-2 text-gray-700">
                                            {option || `Option ${oIndex + 1}`}
                                          </span>
                                        </div>)}
                                  </div>
                                </div>)}
                          </div> : <p className="text-gray-500 text-center py-4">
                            No questions added yet
                          </p>}
                      </div>}
                    {section.type === 'image' && <div className="flex justify-center">
                        {section.content ? <img src={section.content} alt="Content" className="max-h-64 rounded-md" onError={e => {
                  ;
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image';
                }} /> : <div className="h-64 w-full bg-gray-100 flex items-center justify-center rounded-md">
                            <ImageIcon className="h-12 w-12 text-gray-400" />
                          </div>}
                      </div>}
                    {section.type === 'file' && <div className="flex items-center justify-center p-4 bg-gray-50 rounded-md">
                        <FileTextIcon className="h-6 w-6 text-gray-400 mr-2" />
                        <span className="text-gray-600">
                          {section.content ? 'Download file' : 'File attachment will appear here'}
                        </span>
                      </div>}
                  </div>
                </div>)}
            </div>
          </div>}
        {sections.length === 0 && <div className="text-center py-8 bg-gray-50 rounded-md">
            <FileTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">No content sections added yet.</p>
          </div>}
      </div>;
  };
  return <DashboardLayout title={isEditing ? 'Edit Module' : 'Create Module'}>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {isEditing ? `Editing: ${moduleTitle}` : moduleTitle ? moduleTitle : 'Create New Module'}
          </h2>
          <div className="flex space-x-2">
            <button type="button" onClick={cancelModule} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Cancel
            </button>
            <button type="button" onClick={previewModule} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <EyeIcon className="h-4 w-4 mr-2" />
              Preview
            </button>
            <button type="button" onClick={() => saveModule('draft')} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <SaveIcon className="h-4 w-4 mr-2" />
              Save Draft
            </button>
            <button type="button" onClick={() => saveModule('published')} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Publish
            </button>
          </div>
        </div>
        {/* Simplified Module Builder UI */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex" aria-label="Tabs">
              <button onClick={() => setActiveTab('editor')} className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'editor' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                Editor
              </button>
              <button onClick={() => setActiveTab('preview')} className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'preview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                Preview
              </button>
            </nav>
          </div>
          {activeTab === 'editor' ? <div className="p-6">
              {/* Basic Info Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <InfoIcon className="h-5 w-5 text-blue-500 mr-2" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="moduleTitle" className="block text-sm font-medium text-gray-700 mb-1">
                      Module Title*
                    </label>
                    <input type="text" id="moduleTitle" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" value={moduleTitle} onChange={e => setModuleTitle(e.target.value)} placeholder="Enter module title" />
                  </div>
                  <div>
                    <label htmlFor="moduleDescription" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea id="moduleDescription" rows={3} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" value={moduleDescription} onChange={e => setModuleDescription(e.target.value)} placeholder="Enter module description"></textarea>
                  </div>
                </div>
              </div>
              {/* Learning Objectives */}
              <div className="mb-8 border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  Learning Objectives
                </h3>
                <div className="space-y-3">
                  {moduleObjectives.map((objective, index) => <div key={index} className="flex items-center">
                      <input type="text" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" value={objective} onChange={e => handleObjectiveChange(index, e.target.value)} placeholder={`Objective ${index + 1}`} />
                      {moduleObjectives.length > 1 && <button type="button" className="ml-2 text-red-500 hover:text-red-700" onClick={() => removeObjective(index)}>
                          <XIcon className="h-5 w-5" />
                        </button>}
                    </div>)}
                  <button type="button" onClick={addObjective} className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Objective
                  </button>
                </div>
              </div>
              {/* Tags */}
              <div className="mb-8 border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <TagIcon className="h-5 w-5 text-orange-500 mr-2" />
                  Tags
                </h3>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {moduleTags.map(tag => <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white">
                        <XIcon className="h-3 w-3" />
                      </button>
                    </span>)}
                </div>
                <div className="flex">
                  <input type="text" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }} placeholder="Enter tag and press Enter" />
                  <button type="button" onClick={addTag} className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Add
                  </button>
                </div>
              </div>
              {/* Department and Role Assignment */}
              <div className="mb-8 border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <UsersIcon className="h-5 w-5 text-purple-500 mr-2" />
                  Assign To
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Departments */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Departments
                    </h4>
                    <div className="space-y-2">
                      {departments.map(dept => <div key={dept} className="flex items-center">
                          <input id={`dept-${dept}`} type="checkbox" checked={selectedDepartments.includes(dept)} onChange={() => toggleDepartment(dept)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                          <label htmlFor={`dept-${dept}`} className="ml-2 block text-sm text-gray-900">
                            {dept}
                          </label>
                        </div>)}
                    </div>
                  </div>
                  {/* Roles */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Roles
                    </h4>
                    <div className="space-y-2">
                      {roles.map(role => <div key={role} className="flex items-center">
                          <input id={`role-${role}`} type="checkbox" checked={selectedRoles.includes(role)} onChange={() => toggleRole(role)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                          <label htmlFor={`role-${role}`} className="ml-2 block text-sm text-gray-900">
                            {role}
                          </label>
                        </div>)}
                    </div>
                  </div>
                </div>
              </div>
              {/* Content Sections */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FileTextIcon className="h-5 w-5 text-blue-500 mr-2" />
                  Content Sections
                </h3>
                {/* Section List */}
                <div className="mb-6">
                  {sections.length > 0 ? <div className="space-y-2 mb-4">
                      {sections.map((section, index) => <div key={section.id} className={`flex items-center p-3 rounded-md cursor-pointer ${currentSectionIndex === index ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-gray-200'}`} onClick={() => setCurrentSectionIndex(index)}>
                          <div className="cursor-move mr-2">
                            <GripVerticalIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                              {section.type === 'text' && <FileTextIcon className="h-4 w-4 text-blue-500 mr-2" />}
                              {section.type === 'video' && <PlayIcon className="h-4 w-4 text-red-500 mr-2" />}
                              {section.type === 'quiz' && <HelpCircleIcon className="h-4 w-4 text-purple-500 mr-2" />}
                              {section.type === 'image' && <ImageIcon className="h-4 w-4 text-green-500 mr-2" />}
                              {section.type === 'file' && <FileTextIcon className="h-4 w-4 text-orange-500 mr-2" />}
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {section.title}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            {index > 0 && <button type="button" onClick={e => {
                      e.stopPropagation();
                      moveSection(index, index - 1);
                    }} className="p-1 text-gray-400 hover:text-gray-500">
                                <ArrowUpIcon className="h-4 w-4" />
                              </button>}
                            {index < sections.length - 1 && <button type="button" onClick={e => {
                      e.stopPropagation();
                      moveSection(index, index + 1);
                    }} className="p-1 text-gray-400 hover:text-gray-500">
                                <ArrowDownIcon className="h-4 w-4" />
                              </button>}
                            <button type="button" onClick={e => {
                      e.stopPropagation();
                      removeSection(index);
                    }} className="p-1 text-red-400 hover:text-red-500">
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>)}
                    </div> : <div className="text-center py-6 bg-gray-50 rounded-md mb-4">
                      <FileTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 mb-1">
                        No content sections yet
                      </p>
                      <p className="text-sm text-gray-500">
                        Add a section to get started
                      </p>
                    </div>}
                  {/* Add Section Buttons */}
                  <div className="grid grid-cols-5 gap-2">
                    <button type="button" onClick={() => addSection('text')} className="inline-flex flex-col items-center justify-center p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                      <FileTextIcon className="h-6 w-6 text-blue-500 mb-1" />
                      <span className="text-xs">Text</span>
                    </button>
                    <button type="button" onClick={() => addSection('video')} className="inline-flex flex-col items-center justify-center p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                      <PlayIcon className="h-6 w-6 text-red-500 mb-1" />
                      <span className="text-xs">Video</span>
                    </button>
                    <button type="button" onClick={() => addSection('quiz')} className="inline-flex flex-col items-center justify-center p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                      <HelpCircleIcon className="h-6 w-6 text-purple-500 mb-1" />
                      <span className="text-xs">Quiz</span>
                    </button>
                    <button type="button" onClick={() => addSection('image')} className="inline-flex flex-col items-center justify-center p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                      <ImageIcon className="h-6 w-6 text-green-500 mb-1" />
                      <span className="text-xs">Image</span>
                    </button>
                    <button type="button" onClick={() => addSection('file')} className="inline-flex flex-col items-center justify-center p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                      <LinkIcon className="h-6 w-6 text-orange-500 mb-1" />
                      <span className="text-xs">File</span>
                    </button>
                  </div>
                </div>
                {/* Section Editor */}
                {currentSectionIndex !== null && sections[currentSectionIndex] ? <div className="border-t pt-6">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Title
                      </label>
                      <input type="text" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" value={sections[currentSectionIndex].title} onChange={e => updateSection(currentSectionIndex, {
                  title: e.target.value
                })} placeholder="Enter section title" />
                    </div>
                    {renderSectionEditor(sections[currentSectionIndex], currentSectionIndex)}
                  </div> : <div className="text-center py-6 bg-gray-50 rounded-md mt-6 border-t pt-6">
                    <FileTextIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <h3 className="text-md font-medium text-gray-900 mb-1">
                      Select or add a section to edit
                    </h3>
                  </div>}
              </div>
            </div> : <div className="p-6">{renderModulePreview()}</div>}
        </div>
      </div>
    </DashboardLayout>;
};
// Additional components
const ArrowUpIcon = ({
  className
}: {
  className?: string;
}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>;
const ArrowDownIcon = ({
  className
}: {
  className?: string;
}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>;
export default ModuleBuilderPage;
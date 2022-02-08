import siteSettings from "./Constants/Admin/siteSettings";
import useDocumentTitle from './useDocumentTitle';
import Dashboard from "./Views/Admin/Dashboard";
import HomeSetting from './Views/Admin/Settings/HomeSetting';
import EditProfile from './Views/Admin/Profile';
import SiteSettingPage from './Views/Admin/Settings/SiteSettingPage';
import Login from "./Views/Auth/Login";
import ForgetPassword from './Views/Auth/Forget.js';
import OTPAuthentication from './Views/Auth/OTP';
import Home from "./Views/Public/Home";
import About from "./Views/Public/About";
import Account from "./Views/Public/Account";
import ManagerDashboard from "./Views/Public/ManagerDashboard";
import ApproverDashboard from "./Views/Public/ApproverDashboard";
import Contact from "./Views/Public/Contact";
import Convenors from "./Views/Public/Convenors";
import Events from "./Views/Public/Events";
import Member from "./Views/Public/Member";
import News from "./Views/Public/News";
import Participate from "./Views/Public/Participate";
import Selection from "./Views/Public/Selection";
import SingleConvenors from "./Views/Public/SingleConvenors";
import PrivacyPolicy from './Views/Public/PrivacyPolicy';
import Disclaimer from './Views/Public/Disclaimer';
import LegalInformation from './Views/Public/LegalInformation';
import FAQ from './Views/Public/FAQ';
import TermCondition from "./Views/Public/TermCondition";
import ActRegulations from './Views/Public/ActRegulations';
import AboutSetting from './Views/Admin/Settings/AboutSetting';
import EventsSetting from './Views/Admin/Settings/EventsSetting';
import ConvenorsSetting from './Views/Admin/Settings/ConvenorsSetting';
import SingleConvenorsSetting from './Views/Admin/Settings/SingleConvenorsSetting';
import AccountSetting from './Views/Admin/Settings/AccountSetting';
import SelectionProcessSetting from './Views/Admin/Settings/SelectionProcessSetting';
import MemberOrganizationSetting from './Views/Admin/Settings/MemberOrganizationSetting';
import HowToParticipateSetting from './Views/Admin/Settings/HowToParticipateSetting';
import ContactUsSetting from './Views/Admin/Settings/ContactUsSetting';
import InTheNewsSetting from './Views/Admin/Settings/InTheNewsSetting';
import ListPost from './Views/Admin/Posts/ListPost';
import ListParty from './Views/Admin/Parties/ListParty';
import ListCandidate from './Views/Admin/Candidates/ListCandidate';
import ListCommunity from './Views/Admin/Communities/ListCommunity';
import ListEvent from './Views/Admin/Events/ListEvent';
import CreatePost from './Views/Admin/Posts/CreatePost';
import CreateEvent from './Views/Admin/Events/CreateEvent';
import CreateCommunity from './Views/Admin/Communities/CreateCommunity';
import CreateCandidate from './Views/Admin/Candidates/CreateCandidate';
import CreateParty from './Views/Admin/Parties/CreateParty';
import SetNewPassword from "./Views/Auth/SetNewPassword";
import ListSlider from "./Views/Admin/Slider/ListSlider";
import CreateSlider from './Views/Admin/Slider/CreateSlider';
import Comunities from './Views/Public/Comunities';
import Candidates from './Views/Public/Candidates';
import Parties from './Views/Public/Parties';
import CreateConvenor from './Views/Admin/Convenors/CreateConvenor';
import ListConvenors from './Views/Admin/Convenors/List Convernor';
import ActRegulationSettings from './Views/Admin/Settings/ActRegulationSettings';
import TermsConditionsSettings from './Views/Admin/Settings/TermsConditionsSettings';
import LegalInformationSettings from './Views/Admin/Settings/LegalInformationSettings';
import DisclaimerSettings from './Views/Admin/Settings/DisclaimerSettings';
import PrivacyPolicySettings from './Views/Admin/Settings/PrivacyPolicySettings';
import ListMembers from './Views/Admin/Members/ListMembers';
import CreateChannel from './Views/Admin/Channels/CreateChannel';
import ListChannels from './Views/Admin/Channels/ListChannels';
import ListApproval from './Views/Admin/Approvals/ListApproval';
import Approval from './Views/Admin/Approvals/Approval';
import SinglePost from './Views/Public/SinglePost';
import MemberEditProfile from "./Views/Public/MemberEditProfile";
import MemberChangePassword from './Views/Public/MemberChangePassword';
import MemberChannels from "./Views/Public/MemberChannels";
import MemberJoinedChannels from "./Views/Public/MemberJoinedChannels";
import SingleEvent from './Views/Public/SingleEvent';
import PartyDashboard from './Views/Party/PartyDashboard';
import EditParty from "./Views/Party/EditParty";
import { CreateUser } from './Views/Party/Users/CreateUser';
import ListUsers from './Views/Party/Users/ListUsers';
import CreatePosition from './Views/Admin/Positions/CreatePosition';
import CreatePoll from './Views/Admin/Polls/CreatePoll';
import ListPoll from './Views/Admin/Polls/ListPoll';
import ListPosition from './Views/Admin/Positions/ListPosition';
import { MemberPollsAndPositions } from './Views/Public/MemberPollsAndPositions';
import SinglePosition from './Views/Public/SinglePosition';
import SinglePoll from './Views/Public/SinglePoll';

function _Dashboard() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Admin | Dashboard`)
  return <Dashboard />
}
function _EditProfile() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Admin | Edit Profile`)
  return <EditProfile />
}
// _SetNewPassword
function _SetNewPassword() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Set New Password`)
  return <SetNewPassword />
}
function _HomeSetting() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Admin | Home Setting`)
  return <HomeSetting />
}
function _SiteSettingPage() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Admin | Site Setting`)
  return <SiteSettingPage />
}
function _Login() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Login`)
  return <Login />
}
function _ForgetPassword() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Forget Password`)
  return <ForgetPassword />
}
function _OTPAuthentication() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | OTP Authentication`)
  return <OTPAuthentication />
}
function _Home() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Home`)
  return <Home />
}
function _About() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | About Us`)
  return <About />
}
function _Account() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Account`)
  return <Account />
}
function _Contact() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Contact Us`)
  return <Contact />
}
function _Convenors() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Convenors`)
  return <Convenors />
}
function _Events() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Events`)
  return <Events />
}
function _Member() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Member Organizations`)
  return <Member />
}
function _News() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Posts`)
  return <News />
}
function _Participate() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | How to Participate`)
  return <Participate />
}
function _Selection() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Selection Process`)
  return <Selection />
}
function _SingleConvenors() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Single Convenor`)
  return <SingleConvenors />
}
function _privacyPolicy() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Privacy Policy`)
  return <PrivacyPolicy />
}
function _Disclaimer() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Discalimer`)
  return <Disclaimer />
}
function _LegalInformation() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Legal Information`)
  return <LegalInformation />
}
function _FAQ() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | FAQs`)
  return <FAQ />
}
function _TermsConditions() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Terms & Conditions`)
  return <TermCondition />
}
function _ActRegulation() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Act and Regulation`)
  return <ActRegulations />
}
function _AboutSetting() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | About Page Settings`)
  return <AboutSetting />
}
function _EventsSetting() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Events Page Settings`)
  return <EventsSetting />
}
function _ConvenorsSetting() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Convenors Page Settings`)
  return <ConvenorsSetting />
}
function _SingleConvenorsSetting() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Single Convenor Page Settings`)
  return <SingleConvenorsSetting />
}
function _AccountSetting() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Account Page Settings`)
  return <AccountSetting />
}
function _SelectionProcessSetting() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Selection Process Page Settings`)
  return <SelectionProcessSetting />
}
function _MemberOrganizationSetting() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Member Organization Page Settings`)
  return <MemberOrganizationSetting />
}
function _HowToParticipateSetting() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | How To Participate Page Settings`)
  return <HowToParticipateSetting />
}
function _ContactUsSetting() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Contact Us Page Settings`)
  return <ContactUsSetting />
}
function _InTheNewsSetting() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Posts Page Settings`)
  return <InTheNewsSetting />
}
function _ListPost() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | All Posts`)
  return <ListPost />
}
function _CreatePost() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Add New Post`)
  return <CreatePost />
}
function _ListEvent() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | All Event`)
  return <ListEvent />
}
function _CreateEvent() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Add New Event`)
  return <CreateEvent />
}
function _ListCommunity() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | All Community`)
  return <ListCommunity />
}
function _CreateCommunity() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Add New Community`)
  return <CreateCommunity />
}
function _ListCandidates() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | All Candidate`)
  return <ListCandidate />
}
function _CreateCandidate() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Add New Candidate`)
  return <CreateCandidate />
}
function _ListParties() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | All Parties`)
  return <ListParty />
}
function _CreateParty() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Add New Party`)
  return <CreateParty />
}
function _ListSlider() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | All Slider`)
  return <ListSlider />
}
function _CreateSlider() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Add New Slider`)
  return <CreateSlider />
}
function _Communities() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Chapters`)
  return <Comunities />
}
function _Candidates() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Candidates`)
  return <Candidates />
}
function _Parties() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Member Organizations`)
  return <Parties />
}
function _ListConvenors() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | All Convenors`)
  return <ListConvenors />
}
function _CreateConvenor() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Add New Convenor`)
  return <CreateConvenor />
}
function _PrivacyPolicySettings() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Privacy Policy Settings`)
  return <PrivacyPolicySettings />
}
function _DisclaimerSettings() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Disclaimer Settings`)
  return <DisclaimerSettings />
}
function _LegalInformationSettings() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Legal Information Settings`)
  return <LegalInformationSettings />
}
function _TermsConditionsSettings() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Terms & Conditions Settings`)
  return <TermsConditionsSettings />
}
function _ActRegulationSettings() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Act & Regulation Settings`)
  return <ActRegulationSettings />
}
function _ListChannels() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | List of Channels`)
  return <ListChannels />
}
function _CreateChannel() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Create New Channel`)
  return <CreateChannel />
}
function _ListMembers() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | List of Members`)
  return <ListMembers />
}
function _ListApproval() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | List of Approvals`)
  return <ListApproval />
}

function _Approval() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Member Approvals for Channel`)
  return <Approval />
}
function _SinglePost() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Single Post`)
  return <SinglePost />
}
// _SingleEvent
function _SingleEvent() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Single Event`)
  return <SingleEvent />
}
// _MemberEditProfile
function _MemberEditProfile() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Member Edit Profile`)
  return <MemberEditProfile />
}
function _MemberChangePassword() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Member Password Change`)
  return <MemberChangePassword />
}
function _MemberChannels() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Member Channels`)
  return <MemberChannels />
}
function _MemberJoinedChannels() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Member Joined Channels`)
  return <MemberJoinedChannels />
}
// _DashboardParty
// _EditParty
function _DashboardParty() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Party Dashboard`)
  return <PartyDashboard />
}
function _EditParty() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Edit Party`)
  return <EditParty />
}
// ListUsers
// _CreateUser
function _ListUsers() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | List Users`)
  return <ListUsers />
}
function _CreateUser() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Create User`)
  return <CreateUser />
}
function _ListPositions() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | List Positions`)
  return <ListPosition   />
}
function _CreatePosition() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Create Position`)
  return <CreatePosition />
}
function _ListPolls() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | List Polls`)
  return <ListPoll />
}
function _CreatePoll() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Create Poll`)
  return <CreatePoll />
}
// MemberPollsAndPositions
function _MemberPollsAndPositions() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Polls And Positions`)
  return <MemberPollsAndPositions />
}
// singlePosition
function _singlePosition() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Position`)
  return <SinglePosition />
}
// singlePoll
function _singlePoll() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Poll`)
  return <SinglePoll />
}
// singlePosition
function _ApproverDashboard() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Approver Dashboard`)
  return <ApproverDashboard />
}
// singlePoll
function _ManagerDashboard() {
  useDocumentTitle(`${siteSettings.SiteSettings[0].SITE_TITLE} | Manager Dashboard`)
  return <ManagerDashboard />
}
// _1Sambilita
function _1Sambalita() {
  window.location.href = 'http://socialwolf.co.in/'; 
  return null;
}
function _1SambalitaDonate() {
  window.location.href = 'https://1donation.org/donate'; 
  return null;
}
var routes = [
  //Auth
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: _Login,
    layout: "/auth",
  },
  {
    path: "/otpAuthentication",
    name: "OTP Authentication",
    icon: "ni ni-key-25 text-info",
    component: _OTPAuthentication,
    layout: "/auth",
  },
  {
    path: "/resetPassword",
    name: "Forget Password",
    icon: "ni ni-key-25 text-info",
    component: _ForgetPassword,
    layout: "/auth",
  },
  {
    path: "/setNewPassword",
    name: "Set New Password",
    icon: "ni ni-key-25 text-info",
    component: _SetNewPassword,
    layout: "/auth",
  },
  //Party Portal
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: _DashboardParty,
    layout: "/party",
    type: 'portal',
    order: 1,
  },
  {
    path: "/EditParty",
    name: "Edit Party",
    icon: "ni ni-single-02 text-yellow",
    component: _EditParty,
    layout: "/party",
    type: 'portal',
    order: 2,
  },
  {
    path: "",
    name: "Users",
    icon: "fas fa-users  text-success",
    component: _ListUsers,
    layout: "/party",
    type: 'party_user',
    order: 6,
    subMenu: [
      {
        path: "/ListUsers",
        name: "All Users",
        icon: "fas fa-users text-yellow",
        component: _ListUsers,
        layout: "/party",
        order: 1,
      },
      {
        path: "/CreateUser",
        name: "Add User",
        icon: "ni ni-single-02 text-yellow",
        component: _CreateUser,
        layout: "/party",
        order: 2,
      },
    ]
  },
  //Admin Portal
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: _Dashboard,
    layout: "/admin",
    type: 'portal',
    order: 1,
  },
  {
    path: "/EditProfile",
    name: "Edit Profile",
    icon: "ni ni-single-02 text-yellow",
    component: _EditProfile,
    layout: "/admin",
    type: 'portal',
    order: 2,
  },
  //Slider 
  {
    path: "",
    name: "Slider",
    icon: "fas fa-paperclip text-danger",
    component: _ListEvent,
    layout: "/admin",
    type: 'SLIDER_SETTING',
    order: 2,
    subMenu: [
      {
        path: "/ListSlider",
        name: "All Slider",
        icon: "ni ni-single-02 text-yellow",
        component: _ListSlider,
        layout: "/admin",
        order: 1,
      },
      {
        path: "/CreateSlider",
        name: "Add Slider",
        icon: "ni ni-single-02 text-yellow",
        component: _CreateSlider,
        layout: "/admin",
        order: 2,
      },
    ]
  },
  //Post Hierarchy
  {
    path: "",
    name: "Posts",
    icon: "fal fa-newspaper text-primary",
    component: _ListPost,
    layout: "/admin",
    type: 'post_type',
    order: 1,
    subMenu: [
      {
        path: "/ListPost",
        name: "All Posts",
        icon: "fal fa-newspaper text-yellow",
        component: _ListPost,
        layout: "/admin",
        order: 1,
      },
      {
        path: "/CreatePost",
        name: "Add Post",
        icon: "fal fa-newspaper text-yellow",
        component: _CreatePost,
        layout: "/admin",
        order: 2,
      },
    ]
  },
  {
    path: "",
    name: "Events",
    icon: "fas fa-calendar-week text-danger",
    component: _ListEvent,
    layout: "/admin",
    type: 'post_type',
    order: 2,
    subMenu: [
      {
        path: "/ListEvent",
        name: "All Events",
        icon: "ni ni-single-02 text-yellow",
        component: _ListEvent,
        layout: "/admin",
        order: 1,
      },
      {
        path: "/CreateEvent",
        name: "Add Event",
        icon: "ni ni-single-02 text-yellow",
        component: _CreateEvent,
        layout: "/admin",
        order: 2,
      },
    ]
  },
  {
    path: "",
    name: "Chapters",
    icon: "fas fa-paperclip text-success",
    component: _ListCommunity,
    layout: "/admin",
    type: 'post_type',
    order: 3,
    subMenu: [
      {
        path: "/ListCommunity",
        name: "All Chapters",
        icon: "ni ni-single-02 text-yellow",
        component: _ListCommunity,
        layout: "/admin",
        order: 1,
      },
      {
        path: "/CreateCommunity",
        name: "Add Chapter",
        icon: "ni ni-single-02 text-yellow",
        component: _CreateCommunity,
        layout: "/admin",
        order: 2,
      },
    ]
  },
  {
    path: "",
    name: "Candidates",
    icon: "fal fa-user-graduate text-info",
    component: _ListCandidates,
    layout: "/admin",
    type: 'post_type',
    order: 4,
    subMenu: [
      {
        path: "/ListCandidates",
        name: "All Candidates",
        icon: "fal fa-user-graduate text-yellow",
        component: _ListCandidates,
        layout: "/admin",
        order: 1,
      },
      {
        path: "/CreateCandidate",
        name: "Add Candidate",
        icon: "fal fa-user-graduate text-yellow",
        component: _CreateCandidate,
        layout: "/admin",
        order: 2,
      },
    ]
  },
  {
    path: "",
    name: "Member Organizations",
    icon: "fas fa-sitemap text-default",
    component: _ListParties,
    layout: "/admin",
    type: 'post_type',
    order: 5,
    subMenu: [
      {
        path: "/ListParties",
        name: "All Member Organizations",
        icon: "fas fa-sitemap text-yellow",
        component: _ListParties,
        layout: "/admin",
        order: 1,
      },
      {
        path: "/CreateParty",
        name: "Add Member Organization",
        icon: "fas fa-sitemap text-yellow",
        component: _CreateParty,
        layout: "/admin",
        order: 2,
      },
    ]
  },
  {
    path: "",
    name: "Convenors",
    icon: "fas fa-user-friends  text-success",
    component: _ListConvenors,
    layout: "/admin",
    type: 'post_type',
    order: 6,
    subMenu: [
      {
        path: "/ListConvenors",
        name: "All Convenors",
        icon: "fas fa-user-friends text-yellow",
        component: _ListConvenors,
        layout: "/admin",
        order: 1,
      },
      {
        path: "/CreateConvenor",
        name: "Add Convenor",
        icon: "fas fa-user-friends text-yellow",
        component: _CreateConvenor,
        layout: "/admin",
        order: 2,
      },
    ]
  },
  {
    path: "",
    name: "Channels",
    icon: "fas fa-layer-group text-default",
    component: _ListChannels,
    layout: "/admin",
    type: 'post_type',
    order: 6,
    subMenu: [
      {
        path: "/ListChannels",
        name: "All Channels",
        icon: "fas fa-layer-group text-yellow",
        component: _ListChannels,
        layout: "/admin",
        order: 1,
      },
      {
        path: "/CreateChannel",
        name: "Add Channel",
        icon: "fas fa-layer-group text-yellow",
        component: _CreateChannel,
        layout: "/admin",
        order: 2,
      },
    ]
  },
  {
    path: "",
    name: "Members",
    icon: "fas fa-users  text-success",
    component: _ListChannels,
    layout: "/admin",
    type: 'post_type',
    order: 6,
    subMenu: [
      {
        path: "/ListMembers",
        name: "All Members",
        icon: "fas fa-users text-yellow",
        component: _ListMembers,
        layout: "/admin",
        order: 1,
      }
    ]
  },
  {
    path: "",
    name: "Approval",
    icon: "far fa-smile  text-success",
    component: _ListApproval,
    layout: "/admin",
    type: 'post_type',
    order: 6,
    subMenu: [
      {
        path: "/ListApproval",
        name: "All Approval",
        icon: "far fa-smile text-yellow",
        component: _ListApproval,
        layout: "/admin",
        order: 1,
      },
      {
        path: "/Approval",
        name: "Approval",
        icon: "far fa-smile text-yellow",
        component: _Approval,
        layout: "/admin",
        order: 1,
      }
    ]
  },
  {
    path: "",
    name: "Polls",
    icon: "fas fa-layer-group text-default",
    component: _ListPositions,
    layout: "/admin",
    type: 'post_type',
    order: 6,
    subMenu: [
      {
        path: "/ListPolls",
        name: "All Polls",
        icon: "fas fa-layer-group text-yellow",
        component: _ListPolls,
        layout: "/admin",
        order: 1,
      },
      {
        path: "/CreatePoll",
        name: "Add Poll",
        icon: "fas fa-layer-group text-yellow",
        component: _CreatePoll,
        layout: "/admin",
        order: 2,
      },
    ]
  },
  {
    path: "",
    name: "Positions",
    icon: "fas fa-layer-group text-default",
    component: _ListPositions,
    layout: "/admin",
    type: 'post_type',
    order: 6,
    subMenu: [
      {
        path: "/ListPositions",
        name: "All Positions",
        icon: "fas fa-layer-group text-yellow",
        component: _ListPositions,
        layout: "/admin",
        order: 1,
      },
      {
        path: "/CreatePosition",
        name: "Add Position",
        icon: "fas fa-layer-group text-yellow",
        component: _CreatePosition,
        layout: "/admin",
        order: 2,
      },
    ]
  },
  //Admin SETTINGS
  {
    path: "/HomeSetting",
    name: "Home",
    icon: "ni ni-settings  text-danger",
    component: _HomeSetting,
    layout: "/admin",
    type: 'PAGE_SETTINGS',
    order: 1,
  },
  {
    path: "/AboutSetting",
    name: "About Us",
    icon: "ni ni-settings text-default",
    component: _AboutSetting,
    layout: "/admin",
    type: 'PAGE_SETTINGS',
    order: 2,
  },
  // {
  //   path: "/EventsSetting",
  //   name: "Events",
  //   icon: "ni ni-settings text-primary",
  //   component: _EventsSetting,
  //   layout: "/admin",
  //   type: 'PAGE_SETTINGS',
  //   order: 3,
  // },
  // {
  //   path: "/ConvenorsSetting",
  //   name: "Convenors",
  //   icon: "ni ni-settings text-success",
  //   component: _ConvenorsSetting,
  //   layout: "/admin",
  //   type: 'PAGE_SETTINGS',
  //   order: 4,
  // },
  // {
  //   path: "/SingleConvenorsSetting",
  //   name: "Single Convenors",
  //   icon: "ni ni-settings text-info",
  //   component: _SingleConvenorsSetting,
  //   layout: "/admin",
  //   type: 'PAGE_SETTINGS',
  //   order: 5,
  // },
  // {
  //   path: "/AccountSetting",
  //   name: "Account",
  //   icon: "ni ni-settings text-yellow",
  //   component: _AccountSetting,
  //   layout: "/admin",
  //   type: 'PAGE_SETTINGS',
  //   order: 6,
  // },
  {
    path: "/SelectionProcessSetting",
    name: "Selection Process",
    icon: "ni ni-settings text-success",
    component: _SelectionProcessSetting,
    layout: "/admin",
    type: 'PAGE_SETTINGS',
    order: 7,
  },
  // {
  //   path: "/MemberOrganizationSetting",
  //   name: "Member Organization",
  //   icon: "ni ni-settings text-default",
  //   component: _MemberOrganizationSetting,
  //   layout: "/admin",
  //   type: 'PAGE_SETTINGS',
  //   order: 8,
  // },
  // {
  //   path: "/HowToParticipateSetting",
  //   name: "How To Participate",
  //   icon: "ni ni-settings text-primary",
  //   component: _HowToParticipateSetting,
  //   layout: "/admin",
  //   type: 'PAGE_SETTINGS',
  //   order: 9,
  // },
  {
    path: "/ContactUsSetting",
    name: "Contact Us",
    icon: "ni ni-settings text-primary",
    component: _ContactUsSetting,
    layout: "/admin",
    type: 'PAGE_SETTINGS',
    order: 10,
  },
  {
    path: "/PrivacyPolicySettings",
    name: "Privacy Policy Settings",
    icon: "ni ni-settings text-info",
    component: _PrivacyPolicySettings,
    layout: "/admin",
    type: 'PAGE_SETTINGS',
    order: 11,
  }, {
    path: "/DisclaimerSettings",
    name: "Disclaimer Settings",
    icon: "ni ni-settings text-primary",
    component: _DisclaimerSettings,
    layout: "/admin",
    type: 'PAGE_SETTINGS',
    order: 12,
  },
  {
    path: "/LegalInformationSettings",
    name: "Legal Information Settings",
    icon: "ni ni-settings text-default",
    component: _LegalInformationSettings,
    layout: "/admin",
    type: 'PAGE_SETTINGS',
    order: 13,
  },
  // {
  //   path: "/FAQ",
  //   name: "FAQ",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: _FAQ,
  //   layout: "/admin",
  //   type: 'PAGE_SETTINGS',
  //   order: 14,
  // },
  {
    path: "/TermsConditionsSettings",
    name: "Terms & Conditions Settings",
    icon: "ni ni-settings text-info",
    component: _TermsConditionsSettings,
    layout: "/admin",
    type: 'PAGE_SETTINGS',
    order: 15,
  },
  {
    path: "/ActRegulationSettings",
    name: "Act and Regulation Settings",
    icon: "ni ni-settings text-danger",
    component: _ActRegulationSettings,
    layout: "/admin",
    type: 'PAGE_SETTINGS',
    order: 16,
  },
  // {
  //   path: "/InTheNewsSetting",
  //   name: "In The News",
  //   icon: "ni ni-settings  text-danger",
  //   component: _InTheNewsSetting,
  //   layout: "/admin",
  //   type: 'PAGE_SETTINGS',
  //   order: 11,
  // },
  {
    path: "/SiteSetting",
    name: "Site",
    icon: "ni ni-settings-gear-65 text-success",
    component: _SiteSettingPage,
    layout: "/admin",
    type: 'SETTINGS',
    order: 1,
  },
  //Public Pages
  {
    path: "/",
    name: "Home",
    icon: "ni ni-tv-2 text-primary",
    component: _Home,
    layout: "",
    show: "no",
    order: 12,
  },
  {
    path: "/about",
    name: "About Us",
    icon: "ni ni-tv-2 text-primary",
    component: _About,
    layout: "",
    show: "no",
    order: 1,
  },
  {
    path: "/posts",
    name: "Posts",
    icon: "ni ni-tv-2 text-primary",
    component: _News,
    layout: "",
    show: "yes",
    order: 2,
  },
  {
    path: "/chapters",
    name: "Chapters",
    icon: "ni ni-tv-2 text-primary",
    component: _Communities,
    layout: "",
    show: "yes",
    order: 3,
  },
  {
    path: "/candidates",
    name: "Candidates",
    icon: "ni ni-tv-2 text-primary",
    component: _Candidates,
    layout: "",
    show: "yes",
    order: 4,
  },
  {
    path: "/parties",
    name: "Member Organizations",
    icon: "ni ni-tv-2 text-primary",
    component: _Parties,
    layout: "",
    show: "yes",
    order: 5,
  },
  {
    path: "/convenors",
    name: "Convenors",
    icon: "ni ni-tv-2 text-primary",
    component: _Convenors,
    layout: "",
    show: "yes",
    order: 6,
  },
  {
    path: "/events",
    name: "Events",
    icon: "ni ni-tv-2 text-primary",
    component: _Events,
    layout: "",
    show: "no",
    order: 7,
  },
  {
    path: "/account",
    name: "Account",
    icon: "ni ni-tv-2 text-primary",
    component: _Account,
    layout: "",
    show: "no",
    order: 4,
  },
  {
    path: "/ApproverDashboard",
    name: "Approver Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: _ApproverDashboard,
    layout: "",
    show: "no",
    order: 4,
  },
  {
    path: "/ManagerDashboard",
    name: "Manager Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: _ManagerDashboard,
    layout: "",
    show: "no",
    order: 4,
  },
  {
    path: "/selectionProcess",
    name: "Selection Process",
    icon: "ni ni-tv-2 text-primary",
    component: _Selection,
    layout: "",
    show: "no",
    order: 5,
  },
  // {
  //   path: "/member_organization",
  //   name: "Member Organizations",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: _Member,
  //   layout: "",
  //   show: "no",
  //   order: 6,
  // },
  {
    path: "/participate",
    name: "How to Participate",
    icon: "ni ni-tv-2 text-primary",
    component: _Participate,
    layout: "",
    show: "no",
    order: 7,
  },
  {
    path: "/contact",
    name: "Contact Us",
    icon: "ni ni-tv-2 text-primary",
    component: _Contact,
    layout: "",
    show: "yes",
    order: 8,
  },
  {
    path: "/singleConvenor",
    name: "Single Convenor",
    icon: "ni ni-tv-2 text-primary",
    component: _SingleConvenors,
    layout: "",
    show: "no",
  },
  {
    path: "/singlePost",
    name: "Single Post",
    icon: "ni ni-tv-2 text-primary",
    component: _SinglePost,
    layout: "",
    show: "no",
  },
  {
    path: "/singleEvent",
    name: "Single Event",
    icon: "ni ni-tv-2 text-primary",
    component: _SingleEvent,
    layout: "",
    show: "no",
  },
  {
    path: "/PrivacyPolicy",
    name: "Privacy Policy",
    icon: "ni ni-tv-2 text-primary",
    component: _privacyPolicy,
    layout: "",
    show: "no",
  },
  {
    path: "/Disclaimer",
    name: "Disclaimer",
    icon: "ni ni-tv-2 text-primary",
    component: _Disclaimer,
    layout: "",
    show: "no",
  },
  {
    path: "/LegalInformation",
    name: "Legal Information",
    icon: "ni ni-tv-2 text-primary",
    component: _LegalInformation,
    layout: "",
    show: "no",
  },
  {
    path: "/FAQ",
    name: "FAQ",
    icon: "ni ni-tv-2 text-primary",
    component: _FAQ,
    layout: "",
    show: "no",
  },
  {
    path: "/TermsConditions",
    name: "Terms & Conditions",
    icon: "ni ni-tv-2 text-primary",
    component: _TermsConditions,
    layout: "",
    show: "no",
  },
  {
    path: "/ActRegulation",
    name: "Act and Regulation",
    icon: "ni ni-tv-2 text-primary",
    component: _ActRegulation,
    layout: "",
    show: "no",
  },
  {
    path: "/MemberEditProfile",
    name: "Member Edit Profile",
    icon: "ni ni-tv-2 text-primary",
    component: _MemberEditProfile,
    layout: "",
    show: "no",
  },
  {
    path: "/MemberPollsAndPositions",
    name: "Member Edit Profile",
    icon: "ni ni-tv-2 text-primary",
    component: _MemberPollsAndPositions,
    layout: "",
    show: "no",
  },
  { 
    path: "/singlePoll",
    name: "Member Edit Profile",
    icon: "ni ni-tv-2 text-primary",
    component: _singlePoll,
    layout: "",
    show: "no",
  },
  {
    path: "/singlePosition",
    name: "Member Edit Profile",
    icon: "ni ni-tv-2 text-primary",
    component: _singlePosition,
    layout: "",
    show: "no",
  },
  {
    path: "/MemberChangePassword",
    name: "Member Change Password",
    icon: "ni ni-tv-2 text-primary",
    component: _MemberChangePassword,
    layout: "",
    show: "no",
  },
  {
    path: "/MemberChannels",
    name: "Member Channels",
    icon: "ni ni-tv-2 text-primary",
    component: _MemberChannels,
    layout: "",
    show: "no",
  },
  {
    path: "/MemberJoinedChannels",
    name: "Member Edit Profile",
    icon: "ni ni-tv-2 text-primary",
    component: _MemberJoinedChannels,
    layout: "",
    show: "no",
  },
  {
    path: "/1Sambalita",
    name: "Member Edit Profile",
    icon: "ni ni-tv-2 text-primary",
    component: _1Sambalita,
    layout: "",
    show: "no",
  },
  {
    path: "/1SambalitaDonate",
    name: "Member Edit Profile",
    icon: "ni ni-tv-2 text-primary",
    component: _1SambalitaDonate,
    layout: "",
    show: "no",
  },
];
export default routes;

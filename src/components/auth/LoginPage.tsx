import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Scroll, 
  Mail, 
  Lock, 
  XCircle, 
  Shield, 
  KeyRound,
  ServerCog,
  ShieldCheck,
  Globe2,
  HardDrive
} from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signIn(email, password);
      navigate('/');
    } catch (error: any) {
      console.error('Error signing in:', error);
      
      if (error?.name === 'AuthApiError') {
        switch (error.status) {
          case 400:
            setError('Invalid email or password');
            break;
          case 422:
            setError('Invalid email format');
            break;
          case 429:
            setError('Too many attempts. Please try again later');
            break;
          default:
            setError('Failed to sign in. Please check your credentials');
        }
      } else {
        setError('An unexpected error occurred. Please try again');
      }
      
      toast.error('Sign in failed', {
        description: 'Please check your credentials and try again',
      });
    } finally {
      setLoading(false);
    }
  };

  const securityFeatures = [
    {
      icon: ShieldCheck,
      title: "SOC2 Type II",
      description: "Certified Security Controls"
    },
    {
      icon: KeyRound,
      title: "End-to-End",
      description: "256-bit TLS Encryption"
    },
    {
      icon: ServerCog,
      title: "99.99%",
      description: "Service Availability"
    },
    {
      icon: Globe2,
      title: "Global",
      description: "Edge Network"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <div className="w-full max-w-[400px] px-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-primary/5 text-primary ring-1 ring-primary/10">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-[32px] font-bold tracking-tight text-foreground">
            Sign In
          </h1>
          <p className="text-[14px] text-muted-foreground mt-1">
            Secured by Supabase Auth
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-[14px] text-destructive flex items-start">
            <XCircle className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[14px] font-medium">
              Email address
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-[11px] flex items-center justify-center">
                <Mail className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                placeholder="name@example.com"
                required
                className="pl-9 h-10 text-[14px] bg-background transition-all border-border hover:border-foreground/20"
                disabled={loading}
                aria-invalid={error ? 'true' : 'false'}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[14px] font-medium">
              Password
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-[11px] flex items-center justify-center">
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                required
                className="pl-9 h-10 text-[14px] bg-background transition-all border-border hover:border-foreground/20"
                disabled={loading}
                aria-invalid={error ? 'true' : 'false'}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-10 text-[14px] mt-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Scroll className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </form>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="grid grid-cols-2 gap-4">
            {securityFeatures.map((feature, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border flex flex-col items-center text-center space-y-1 hover:border-foreground/20 transition-colors group"
              >
                <feature.icon className="h-4 w-4 text-primary mb-1 group-hover:text-foreground transition-colors" />
                <span className="text-[13px] font-medium">{feature.title}</span>
                <span className="text-[11px] text-muted-foreground">{feature.description}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center space-x-2 text-[13px] text-muted-foreground">
            <HardDrive className="h-3 w-3" />
            <span>Data encrypted at rest with AES-256</span>
          </div>

          <p className="mt-6 text-center text-[13px] text-muted-foreground">
            By continuing, you agree to our{' '}
            <a href="#" className="hover:text-foreground transition-colors underline decoration-border hover:decoration-foreground">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="hover:text-foreground transition-colors underline decoration-border hover:decoration-foreground">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
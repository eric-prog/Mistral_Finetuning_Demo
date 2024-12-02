export interface Hyperparameters {
  training_steps?: number;
  learning_rate: number;
  weight_decay: number;
  warmup_fraction: number;
  epochs: number;
  fim_ratio: number;
  seq_len: number;
}

export interface MistralFile {
  id: string;
  object: string;
  bytes: number;
  created_at: number;
  filename: string;
  purpose: string;
  sample_type: string;
  num_lines: number;
  source: string;
}

export interface FineTuningJob {
  id: string;
  status: string;
  model: string;
  training_files: string[];
  validation_files: string[];
  hyperparameters: Hyperparameters;
  suffix: string;
  created_at: number;
  trained_tokens: number;
  metadata?: {
    expected_duration_seconds: number;
    cost: number;
    cost_currency: string;
    train_tokens: number;
    data_tokens: number;
  };
}
